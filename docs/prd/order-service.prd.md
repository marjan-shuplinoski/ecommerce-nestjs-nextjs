# Order Service – Product Requirements Document

## Status
In Progress

## Overview
Implements robust, feature-sliced Order service logic for Ecommerce backend (NestJS/Mongoose). Supports order creation from cart, status/payment lifecycle, admin/manual payment, stock reduction, and notification integration. Strict TypeScript, error handling, and test coverage required.

## Features
- Create order from cart (user/guest)
- Unique order number generation
- Shipping and billing address validation
- Order item mapping from cart
- Subtotal, tax, shipping, discount, total calculation
- Order status lifecycle (pending, confirmed, shipped, delivered, cancelled, returned, completed)
- Payment status lifecycle (unpaid, paid, confirmed, failed)
- Manual payment confirmation (admin only)
- Order tracking and notes
- Order cancellation (user/admin)
- Stock reduction on order creation (atomic)
- Notification integration (success, warning, error)
- Order history/audit trail
- Strict type safety
- Full Jest test coverage
- RESTful API controller

## API Endpoints
| Method | Path                        | Description                  | Body Params                  |
|--------|-----------------------------|------------------------------|------------------------------|
| POST   | /api/orders                 | Create order from cart       | cartId, shipping, billing    |
| GET    | /api/orders                 | List orders (user/admin)     | -                            |
| GET    | /api/orders/:id             | Get order details            | -                            |
| PATCH  | /api/orders/:id/status      | Update order status          | status, notes                |
| PATCH  | /api/orders/:id/payment-status | Confirm payment (admin)   | paymentStatus, confirmationId|
| PATCH  | /api/orders/:id/cancel      | Cancel order                 | notes                        |

## Architecture
- Feature-sliced: service, schema, types, controller, tests grouped by order feature
- Uses Mongoose subdocuments for items
- All business logic in service
- No direct DB access from controllers
- NotificationService integrated for all responses

## Traceability
- All methods and tests mapped to tasks in TODO file

## Task Status
- [x] Schema/Types
- [x] DTOs
- [ ] Service logic
- [ ] Lint/type fixes
- [ ] Jest tests
- [ ] Controller
- [ ] API docs
- [ ] Controller Jest tests
- [ ] Documentation finalization

---
