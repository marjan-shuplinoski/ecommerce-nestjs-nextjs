import { render, screen, fireEvent } from '@testing-library/react';
import { BrandFilter } from '../BrandFilter';

describe('BrandFilter', () => {
    it('renders brands and toggles selection', () => {
        const brands = ['Apple', 'Samsung'];
        const onChange = jest.fn();
        render(<BrandFilter brands={brands} selected={['Apple']} onChange={onChange} />);
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Samsung')).toBeInTheDocument();
        fireEvent.click(screen.getByLabelText('Samsung'));
        // onChange should be called with ['Apple', 'Samsung']
    });
});
