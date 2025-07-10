import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';
import CartSidebar from './CartSidebar';

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart } = useCart();

    if (!items.length) return <div>Your cart is empty.</div>;

    return (
        <div className="cart-page">
            <div className="cart-items">
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                    />
                ))}
            </div>
            <CartSidebar items={items} onCheckout={clearCart} />
        </div>
    );
}
