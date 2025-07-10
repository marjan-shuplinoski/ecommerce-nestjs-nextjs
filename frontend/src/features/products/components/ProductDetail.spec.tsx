import React from 'react';
import { render } from '@testing-library/react';
import ProductDetail from './ProductDetail';

describe('ProductDetail', () => {
    it('renders product detail layout', () => {
        const { getByText } = render(<ProductDetail productId="1" />);
        expect(getByText('Product Name')).toBeInTheDocument();
        expect(getByText('Product specifications here')).toBeInTheDocument();
        expect(getByText('Add to Cart')).toBeInTheDocument();
        expect(getByText('Reviews')).toBeInTheDocument();
    });
});
