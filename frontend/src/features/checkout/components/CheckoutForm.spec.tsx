import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

describe('CheckoutForm', () => {
    it('renders address form and validates required fields', async () => {
        const { getByPlaceholderText, getByText, findByText } = render(<CheckoutForm />);
        fireEvent.click(getByText('Continue'));
        expect(await findByText('Name required')).toBeInTheDocument();
        expect(await findByText('Address required')).toBeInTheDocument();
        expect(await findByText('City required')).toBeInTheDocument();
        expect(await findByText('Postal code required')).toBeInTheDocument();
        expect(await findByText('Country required')).toBeInTheDocument();
    });

    it('submits address and proceeds to order summary', async () => {
        const { getByPlaceholderText, getByText, queryByTestId } = render(<CheckoutForm />);
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByPlaceholderText('Address'), { target: { value: '123 Main St' } });
        fireEvent.change(getByPlaceholderText('City'), { target: { value: 'Metropolis' } });
        fireEvent.change(getByPlaceholderText('Postal Code'), { target: { value: '12345' } });
        fireEvent.change(getByPlaceholderText('Country'), { target: { value: 'USA' } });
        fireEvent.click(getByText('Continue'));
        await waitFor(() => {
            expect(queryByTestId('confirm-order')).toBeInTheDocument();
        });
    });
});
