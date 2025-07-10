import React, { useState } from 'react';
import AddressForm from '../components/AddressForm';
import OrderSummary from '../components/OrderSummary';
import { toast } from 'react-toastify';

export default function CheckoutForm() {
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState<any>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const handleAddressSubmit = (data: any) => {
        setAddress(data);
        setStep(2);
        toast.success('Address saved. Proceed to order summary.');
    };

    const handleOrderConfirm = async () => {
        try {
            // Simulate API call to backend for cash-on-delivery order
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, paymentMethod: 'cash-on-delivery' }),
            });
            if (!response.ok) throw new Error('Order failed');
            const result = await response.json();
            setOrderId(result.orderId);
            setOrderConfirmed(true);
            toast.success('Order placed successfully!');
        } catch (e) {
            toast.error('Failed to place order. Please try again.');
        }
    };

    if (orderConfirmed && orderId) {
        return <div data-testid="order-confirmation"><h2>Order Confirmed!</h2><p>Your order ID: {orderId}</p></div>;
    }

    return (
        <div>
            <CheckoutSteps step={step} />
            {step === 1 && <AddressForm onSubmit={handleAddressSubmit} />}
            {step === 2 && (
                <OrderSummary address={address} onConfirm={handleOrderConfirm} />
            )}
        </div>
    );
}

function CheckoutSteps({ step }: { step: number }) {
    return (
        <div className="checkout-steps">
            <span className={step === 1 ? 'active' : ''}>Address</span>
            <span> &gt; </span>
            <span className={step === 2 ? 'active' : ''}>Order Summary</span>
            <span> &gt; </span>
            <span className={step === 3 ? 'active' : ''}>Confirmation</span>
        </div>
    );
}
