import { render, screen } from '@testing-library/react';
import { SearchFilters } from '../SearchFilters';

describe('SearchFilters', () => {
    it('renders all filter sections', () => {
        render(
            <SearchFilters
                price={[0, 100]}
                brands={['Apple', 'Samsung']}
                ratings={[5, 4, 3]}
                availability={true}
                onChange={jest.fn()}
            />
        );
        expect(screen.getByText('Price Range')).toBeInTheDocument();
        expect(screen.getByText('Brand')).toBeInTheDocument();
        expect(screen.getByText('Rating')).toBeInTheDocument();
        expect(screen.getByText('Availability')).toBeInTheDocument();
    });
});
