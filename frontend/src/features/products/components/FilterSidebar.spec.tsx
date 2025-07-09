import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSidebar, FilterSidebarProps } from './FilterSidebar';

describe('FilterSidebar', () => {
    const baseProps: FilterSidebarProps = {
        categories: ['A', 'B'],
        selectedCategory: 'A',
        onCategoryChange: jest.fn(),
        minPrice: 0,
        maxPrice: 100,
        onPriceChange: jest.fn(),
    };

    it('renders categories and highlights selected', () => {
        render(<FilterSidebar {...baseProps} />);
        expect(screen.getByTestId('category-A')).toHaveClass('bg-blue-100');
        expect(screen.getByTestId('category-B')).not.toHaveClass('bg-blue-100');
    });

    it('calls onCategoryChange when category clicked', () => {
        render(<FilterSidebar {...baseProps} />);
        fireEvent.click(screen.getByTestId('category-B'));
        expect(baseProps.onCategoryChange).toHaveBeenCalledWith('B');
    });
});
