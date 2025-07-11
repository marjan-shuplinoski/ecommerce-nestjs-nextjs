import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistManager } from '../WishlistManager';

describe('WishlistManager', () => {
    it('renders empty wishlist', () => {
        render(<WishlistManager />);
        expect(screen.getByText('No items in wishlist.')).toBeInTheDocument();
    });
});
