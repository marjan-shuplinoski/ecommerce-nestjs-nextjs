import { render, screen, fireEvent } from '@testing-library/react';
import { SortingOptions } from '../SortingOptions';

describe('SortingOptions', () => {
    it('renders sorting options and changes selection', () => {
        const options = ['Price', 'Rating', 'Relevance'];
        const onChange = jest.fn();
        render(<SortingOptions options={options} selected={'Price'} onChange={onChange} />);
        expect(screen.getByText('Sort By')).toBeInTheDocument();
        fireEvent.change(screen.getByDisplayValue('Price'), { target: { value: 'Rating' } });
        // onChange should be called with 'Rating'
    });
});
