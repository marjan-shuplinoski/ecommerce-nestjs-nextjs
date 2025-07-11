import { render, screen, fireEvent } from '@testing-library/react';
import { SaveForLater } from '../SaveForLater';

describe('SaveForLater', () => {
    it('renders empty save for later', () => {
        render(<SaveForLater />);
        expect(screen.getByText('No items saved for later.')).toBeInTheDocument();
    });
});
