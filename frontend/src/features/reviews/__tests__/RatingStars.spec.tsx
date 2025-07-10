import { render, screen, fireEvent } from '@testing-library/react';
import { RatingStars } from '../RatingStars';

describe('RatingStars', () => {
    it('renders 5 stars and handles click', () => {
        const onChange = jest.fn();
        render(<RatingStars value={3} onChange={onChange} />);
        const stars = screen.getAllByRole('button');
        expect(stars).toHaveLength(5);
        fireEvent.click(stars[4]);
        expect(onChange).toHaveBeenCalledWith(5);
    });
});
