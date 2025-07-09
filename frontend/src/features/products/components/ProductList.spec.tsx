import { render, screen } from '@testing-library/react';
import { ProductList, ProductListProps } from './ProductList';

describe('ProductList', () => {
    const products: ProductListProps['products'] = [
        { id: '1', name: 'A', image: '/a.jpg', price: 10, rating: 5 },
        { id: '2', name: 'B', image: '/b.jpg', price: 20, rating: 3 },
    ];

    it('renders a grid of ProductCards', () => {
        render(<ProductList products={products} />);
        expect(screen.getByTestId('product-list')).toBeInTheDocument();
        expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
        expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    });
});
