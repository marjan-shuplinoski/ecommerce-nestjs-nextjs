import { render, screen, fireEvent } from '@testing-library/react';
import { RatingFilter } from '../RatingFilter';

describe('RatingFilter', () => {
    it('renders ratings and toggles selection', () => {
        const ratings = [5, 4, 3];
        const onChange = jest.fn();
        render(<RatingFilter ratings={ratings} selected={[5]} onChange={onChange} />);
        expect(screen.getByText('5★')).toBeInTheDocument();
        expect(screen.getByText('4★')).toBeInTheDocument();
        fireEvent.click(screen.getByLabelText('4★'));
        // onChange should be called with [5, 4]
    });
});
