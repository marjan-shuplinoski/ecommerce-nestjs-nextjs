import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
    it('renders and validates fields', async () => {
        const handleSubmit = jest.fn();
        render(<LoginForm onSubmit={handleSubmit} />);
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });
});
