import React from 'react';

type Props = {
    address: any;
    onConfirm: () => void;
};

export default function OrderSummary({ address, onConfirm }: Props) {
    return (
        <div>
            <h2>Order Summary</h2>
            <div>
                <h3>Shipping Address</h3>
                <pre>{JSON.stringify(address, null, 2)}</pre>
            </div>
            <div>
                <h3>Payment Method</h3>
                <p>Cash on Delivery</p>
            </div>
            <button onClick={onConfirm} data-testid="confirm-order">Confirm Order</button>
        </div>
    );
}
