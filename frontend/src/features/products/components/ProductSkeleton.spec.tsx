import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductSkeleton } from './ProductSkeleton';

describe('ProductSkeleton', () => {
    it('renders the correct number of skeletons', () => {
        render(<ProductSkeleton count={3} />);
        expect(screen.getAllByTestId('product-skeleton')).toHaveLength(3);
    });

    it('renders default count if not specified', () => {
        render(<ProductSkeleton />);
        expect(screen.getAllByTestId('product-skeleton').length).toBeGreaterThan(0);
    });
});
