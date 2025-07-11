import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryList, Category } from '../CategoryList';

describe('CategoryList', () => {
    const categories: Category[] = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Books' },
    ];
    it('renders all categories', () => {
        render(<CategoryList categories={categories} onSelect={jest.fn()} />);
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Books')).toBeInTheDocument();
    });
    it('calls onSelect when clicked', () => {
        const onSelect = jest.fn();
        render(<CategoryList categories={categories} onSelect={onSelect} />);
        fireEvent.click(screen.getByText('Books'));
        expect(onSelect).toHaveBeenCalledWith('2');
    });
});
