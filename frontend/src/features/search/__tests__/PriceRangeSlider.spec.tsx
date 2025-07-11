import { render, screen } from '@testing-library/react';
import { PriceRangeSlider } from '../PriceRangeSlider';

describe('PriceRangeSlider', () => {
    it('renders price range slider', () => {
        render(<PriceRangeSlider min={0} max={100} value={[10, 90]} onChange={jest.fn()} />);
        expect(screen.getByText('Price Range')).toBeInTheDocument();
        expect(screen.getByText('$10 - $90')).toBeInTheDocument();
    });
});
