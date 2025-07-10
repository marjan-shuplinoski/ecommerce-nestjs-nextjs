import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartPage from './CartPage';

jest.mock('../hooks/useCart', () => ({
    useCart: () => ({
        items: [
            { id: '1', name: 'Test Product', price: 10, quantity: 2 },
            { id: '2', name: 'Another Product', price: 20, quantity: 1 },
        ],
        updateQuantity: jest.fn(),
        removeItem: jest.fn(),
        clearCart: jest.fn(),
    }),
}));

describe('CartPage', () => {
    it('renders cart items and sidebar', () => {
        const { getByText } = render(<CartPage />);
        expect(getByText('Test Product')).toBeInTheDocument();
        expect(getByText('Another Product')).toBeInTheDocument();
        expect(getByText('Cart')).toBeInTheDocument();
        expect(getByText('Checkout')).toBeInTheDocument();
    });
});
