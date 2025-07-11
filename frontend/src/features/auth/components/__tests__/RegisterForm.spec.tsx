import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';

describe('RegisterForm', () => {
    it('renders and validates fields', async () => {
        const handleSubmit = jest.fn();
        render(<RegisterForm onSubmit={handleSubmit} />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/confirm your password/i)).toBeInTheDocument();
    });
});
