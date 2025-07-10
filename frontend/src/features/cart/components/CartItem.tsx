import React from 'react';

type CartItemProps = {
    item: any;
    onQuantityChange: (id: string, qty: number) => void;
    onRemove: (id: string) => void;
};

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
    return (
        <div className="cart-item">
            <span>{item.name}</span>
            <span>{item.price}</span>
            <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={e => onQuantityChange(item.id, Number(e.target.value))}
            />
            <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    );
}
