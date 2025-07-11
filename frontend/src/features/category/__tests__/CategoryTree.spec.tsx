import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTree } from '../CategoryTree';
import type { Category } from '../CategoryList';

describe('CategoryTree', () => {
    const categories: Category[] = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Phones', parentId: '1' },
        { id: '3', name: 'Books' },
    ];
    it('renders tree structure', () => {
        render(<CategoryTree categories={categories} onSelect={jest.fn()} />);
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Phones')).toBeInTheDocument();
        expect(screen.getByText('Books')).toBeInTheDocument();
    });
    it('calls onSelect for nested category', () => {
        const onSelect = jest.fn();
        render(<CategoryTree categories={categories} onSelect={onSelect} />);
        fireEvent.click(screen.getByText('Phones'));
        expect(onSelect).toHaveBeenCalledWith('2');
    });
});
