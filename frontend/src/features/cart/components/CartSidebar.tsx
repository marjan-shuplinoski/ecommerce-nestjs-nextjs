import React from 'react';

type CartSidebarProps = {
    items: any[];
    onCheckout: () => void;
};

export default function CartSidebar({ items, onCheckout }: CartSidebarProps) {
    return (
        <aside className="cart-sidebar">
            <h3>Cart</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name} x {item.quantity}</li>
                ))}
            </ul>
            <button onClick={onCheckout}>Checkout</button>
        </aside>
    );
}
