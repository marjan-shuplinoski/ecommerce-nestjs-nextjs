import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard, ProductCardProps } from './ProductCard';

describe('ProductCard', () => {
    const baseProps: ProductCardProps = {
        id: '1',
        name: 'Test Product',
        image: '/test.jpg',
        price: 19.99,
        rating: 4,
    };

    it('renders product info', () => {
        render(<ProductCard {...baseProps} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$19.99')).toBeInTheDocument();
        expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    });

    it('renders correct number of stars', () => {
        render(<ProductCard {...baseProps} />);
        expect(screen.getAllByText('★').length).toBe(5);
    });

    it('calls onClick when clicked', () => {
        const onClick = jest.fn();
        render(<ProductCard {...baseProps} onClick={onClick} />);
        fireEvent.click(screen.getByTestId('product-card-1'));
        expect(onClick).toHaveBeenCalled();
    });
});
