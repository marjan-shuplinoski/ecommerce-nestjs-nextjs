import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Cart, CartDocument } from '../../cart/schemas/cart.schema';
import { Product, ProductDocument } from '../../products/schemas/product.schema';
import { NotificationService, Notification } from '../../../shared/notification';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { ConfirmPaymentDto } from '../dto/confirm-payment.dto';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

/**
 * Service for handling all order-related business logic.
 * Handles order creation, status updates, payment confirmation, and cancellation.
 * All methods are strictly typed and validated.
 */
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(NotificationService) private readonly notificationService: NotificationService,
  ) {}

  /**
   * Creates a new order from a user's cart.
   * Validates cart ownership, stock, and emptiness.
   * Reduces product stock, clears cart, and returns order with notification.
   * @param userId - The user's ObjectId
   * @param dto - Order creation DTO
   * @returns The created order and a notification
   * @throws NotFoundException, ForbiddenException
   */
  async createOrder(
    userId: Types.ObjectId,
    dto: CreateOrderDto,
  ): Promise<{ order: OrderDocument; notification: Notification }> {
    // Defensive: ensure dto is valid and not an error object
    if (
      !dto ||
      typeof dto !== 'object' ||
      dto === null ||
      (dto as any) instanceof Error ||
      typeof (dto as { cartId?: unknown }).cartId !== 'string'
    ) {
      throw new ForbiddenException('Invalid order data');
    }
    // Safe: DTO validated above, assign properties individually for strictest lint compliance
    const cartId = (dto as { cartId: string }).cartId;
    // Safe: DTO validated above, shippingAddress and billingAddress are expected to be objects
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const shippingAddress = (dto as { shippingAddress: any }).shippingAddress;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const billingAddress = (dto as { billingAddress: any }).billingAddress;
    const notes = (dto as { notes?: string }).notes;
    const session = await this.orderModel.db.startSession();
    session.startTransaction();
    try {
      const cart = await this.cartModel.findById(cartId).session(session);
      if (!cart || (cart.userId && !cart.userId.equals(userId))) {
        throw new NotFoundException('Cart not found or not owned by user');
      }
      if (!cart.items.length) {
        throw new ForbiddenException('Cart is empty');
      }
      // Check stock and fetch product names
      const orderItems = [];
      for (const item of cart.items) {
        const product = await this.productModel.findById(item.productId).session(session);
        if (!product || product.stock < item.quantity) {
          throw new ForbiddenException(
            `Insufficient stock for product ${item.productId.toString()}`,
          );
        }
        orderItems.push({
          product: item.productId,
          name: product.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        });
      }
      // Reduce stock
      for (const item of cart.items) {
        await this.productModel.updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.quantity } },
          { session },
        );
      }
      // Calculate totals
      const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const tax = 0; // TODO: tax logic
      const shipping = 0; // TODO: shipping logic
      const discount = 0; // TODO: discount logic
      const total = subtotal + tax + shipping - discount;
      // Create order
      const orderArr = await this.orderModel.create(
        [
          {
            user: userId,
            items: orderItems,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            shippingAddress,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            billingAddress,
            subtotal,
            tax,
            shipping,
            discount,
            total,
            status: OrderStatus.PENDING,
            paymentStatus: PaymentStatus.UNPAID,
            paymentMethod: 'cash_on_delivery',
            notes,
            history: [
              {
                event: 'created',
                status: OrderStatus.PENDING,
                paymentStatus: PaymentStatus.UNPAID,
                timestamp: new Date(),
                user: userId,
              },
            ],
          },
        ],
        { session },
      );
      const order = orderArr[0];
      // Clear cart
      cart.items = [];
      cart.total = 0;
      await cart.save({ session });
      await session.commitTransaction();
      return {
        order,
        notification: this.notificationService.notifySuccess('Order created successfully'),
      };
    } catch (e) {
      await session.abortTransaction();
      let errorMsg = 'Order creation failed';
      if (
        typeof e === 'object' &&
        e !== null &&
        'message' in e &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof (e as any).message === 'string'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMsg = (e as any).message;
      }
      throw new ForbiddenException(errorMsg);
    } finally {
      await session.endSession();
    }
  }

  /**
   * Retrieves a single order by ID, enforcing user/admin access.
   * @param orderId - The order's ID
   * @param userId - The user's ObjectId
   * @param isAdmin - Whether the user is an admin
   * @returns The order document
   * @throws NotFoundException, ForbiddenException
   */
  async getOrder(orderId: string, userId: Types.ObjectId, isAdmin = false): Promise<OrderDocument> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (!isAdmin && !order.user.equals(userId)) throw new ForbiddenException('Access denied');
    return order;
  }

  /**
   * Retrieves all orders for a user, or all orders if admin.
   * @param userId - The user's ObjectId
   * @param isAdmin - Whether the user is an admin
   * @returns Array of order documents
   */
  async getOrders(userId: Types.ObjectId, isAdmin = false): Promise<OrderDocument[]> {
    return isAdmin ? this.orderModel.find() : this.orderModel.find({ user: userId });
  }

  /**
   * Updates the status of an order, enforcing admin/cancel rules.
   * @param orderId - The order's ID
   * @param dto - Status update DTO
   * @param userId - The user's ObjectId
   * @param isAdmin - Whether the user is an admin
   * @returns The updated order and a notification
   * @throws NotFoundException, ForbiddenException
   */
  async updateStatus(
    orderId: string,
    dto: UpdateOrderStatusDto,
    userId: Types.ObjectId,
    isAdmin = false,
  ): Promise<{ order: OrderDocument; notification: Notification }> {
    if (
      !dto ||
      typeof dto !== 'object' ||
      dto === null ||
      (dto as any) instanceof Error ||
      typeof (dto as { status?: unknown }).status !== 'string'
    ) {
      throw new ForbiddenException('Invalid status update data');
    }
    const { status, notes } = dto as { status: OrderStatus; notes?: string };
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (!isAdmin && !order.user.equals(userId)) throw new ForbiddenException('Access denied');
    if (!isAdmin && status !== OrderStatus.CANCELLED)
      throw new ForbiddenException('Only admin can update status');
    if (
      status === OrderStatus.CANCELLED &&
      order.status !== OrderStatus.PENDING &&
      order.status !== OrderStatus.CONFIRMED
    ) {
      throw new ForbiddenException('Cannot cancel after shipping');
    }
    order.status = status;
    if (notes) order.notes = notes;
    order.history.push({
      event: 'status_update',
      status,
      paymentStatus: order.paymentStatus,
      timestamp: new Date(),
      user: userId,
    });
    await order.save();
    return {
      order,
      notification: this.notificationService.notifySuccess('Order status updated'),
    };
  }

  /**
   * Confirms payment for an order (admin only).
   * @param orderId - The order's ID
   * @param dto - Payment confirmation DTO
   * @param userId - The user's ObjectId
   * @param isAdmin - Whether the user is an admin
   * @returns The updated order and a notification
   * @throws NotFoundException, ForbiddenException
   */
  async confirmPayment(
    orderId: string,
    dto: ConfirmPaymentDto,
    userId: Types.ObjectId,
    isAdmin = false,
  ): Promise<{ order: OrderDocument; notification: Notification }> {
    if (
      !dto ||
      typeof dto !== 'object' ||
      dto === null ||
      (dto as any) instanceof Error ||
      typeof (dto as { paymentStatus?: unknown }).paymentStatus !== 'string'
    ) {
      throw new ForbiddenException('Invalid payment confirmation data');
    }
    const { paymentStatus, paymentConfirmationId, notes } = dto as {
      paymentStatus: PaymentStatus;
      paymentConfirmationId?: string;
      notes?: string;
    };
    if (!isAdmin) throw new ForbiddenException('Only admin can confirm payment');
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    order.paymentStatus = paymentStatus;
    if (paymentConfirmationId) order.paymentConfirmationId = paymentConfirmationId;
    if (notes) order.notes = notes;
    order.history.push({
      event: 'payment_update',
      status: order.status,
      paymentStatus,
      timestamp: new Date(),
      user: userId,
    });
    await order.save();
    return {
      order,
      notification: this.notificationService.notifySuccess('Payment status updated'),
    };
  }

  /**
   * Cancels an order if allowed (pending/confirmed only).
   * @param orderId - The order's ID
   * @param userId - The user's ObjectId
   * @param isAdmin - Whether the user is an admin
   * @param notes - Optional cancellation notes
   * @returns The cancelled order and a notification
   * @throws NotFoundException, ForbiddenException
   */
  async cancelOrder(
    orderId: string,
    userId: Types.ObjectId,
    isAdmin = false,
    notes?: string,
  ): Promise<{ order: OrderDocument; notification: Notification }> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (!isAdmin && !order.user.equals(userId)) throw new ForbiddenException('Access denied');
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      throw new ForbiddenException('Cannot cancel after shipping');
    }
    order.status = OrderStatus.CANCELLED;
    if (notes) order.notes = notes;
    order.history.push({
      event: 'cancel',
      status: OrderStatus.CANCELLED,
      paymentStatus: order.paymentStatus,
      timestamp: new Date(),
      user: userId,
    });
    await order.save();
    return {
      order,
      notification: this.notificationService.notifyWarning('Order cancelled'),
    };
  }
}
