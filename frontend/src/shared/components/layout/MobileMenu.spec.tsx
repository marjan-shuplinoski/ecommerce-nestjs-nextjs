import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from './MobileMenu';

describe('MobileMenu', () => {
    it('does not render when open is false', () => {
        const { container } = render(<MobileMenu open={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders and closes on button click', () => {
        const onClose = jest.fn();
        render(<MobileMenu open={true} onClose={onClose} />);
        fireEvent.click(screen.getByLabelText('Close menu'));
        expect(onClose).toHaveBeenCalled();
    });
});
