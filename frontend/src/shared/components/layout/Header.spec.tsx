import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('renders logo and cart count', () => {
        render(<Header cartCount={3} onSearch={jest.fn()} />);
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByLabelText('Cart')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('calls onSearch when form is submitted', () => {
        const onSearch = jest.fn();
        render(<Header cartCount={0} onSearch={onSearch} />);
        fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'test' } });
        fireEvent.submit(screen.getByTestId('search-form'));
        expect(onSearch).toHaveBeenCalledWith('test');
    });
});
