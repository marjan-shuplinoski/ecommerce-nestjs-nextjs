import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewFilters } from '../ReviewFilters';

describe('ReviewFilters', () => {
    it('calls onFilter with correct rating', () => {
        const onFilter = jest.fn();
        render(<ReviewFilters onFilter={onFilter} />);
        fireEvent.click(screen.getByText('5★'));
        expect(onFilter).toHaveBeenCalledWith({ rating: 5 });
        fireEvent.click(screen.getByText('All'));
        expect(onFilter).toHaveBeenCalledWith({});
    });
});
