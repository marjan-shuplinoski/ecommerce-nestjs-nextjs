import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResetPasswordForm } from '../ResetPasswordForm';

describe('ResetPasswordForm', () => {
    it('renders and validates fields', async () => {
        const handleSubmit = jest.fn();
        render(<ResetPasswordForm onSubmit={handleSubmit} />);
        fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    });
});
