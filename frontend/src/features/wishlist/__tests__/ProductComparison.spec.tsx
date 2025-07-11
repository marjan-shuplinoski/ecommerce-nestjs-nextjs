import { render, screen, fireEvent } from '@testing-library/react';
import { ProductComparison } from '../ProductComparison';

describe('ProductComparison', () => {
    const products = [
        { id: '1', name: 'A', image: '/a.jpg', price: 10, specs: { Color: 'Red', Size: 'M' } },
        { id: '2', name: 'B', image: '/b.jpg', price: 20, specs: { Color: 'Blue', Size: 'L' } },
    ];
    it('renders comparison table', () => {
        render(<ProductComparison products={products} onRemove={jest.fn()} />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
        expect(screen.getByText('Red')).toBeInTheDocument();
        expect(screen.getByText('Blue')).toBeInTheDocument();
    });
    it('calls onRemove', () => {
        const onRemove = jest.fn();
        render(<ProductComparison products={products} onRemove={onRemove} />);
        fireEvent.click(screen.getAllByText('Remove')[0]);
        expect(onRemove).toHaveBeenCalledWith('1');
    });
});
