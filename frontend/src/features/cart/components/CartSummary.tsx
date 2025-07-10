import React from 'react';

type CartSummaryProps = {
    items: any[];
};

export default function CartSummary({ items }: CartSummaryProps) {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return (
        <div className="cart-summary">
            <h4>Summary</h4>
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            {/* Add tax/shipping/discount logic as needed */}
            <div>Total: ${subtotal.toFixed(2)}</div>
        </div>
    );
}
