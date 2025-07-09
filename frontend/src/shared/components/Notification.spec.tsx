import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationBar, NotificationBarProps } from './Notification';

describe('NotificationBar', () => {
    const baseProps: NotificationBarProps = {
        notification: { type: 'success', message: 'Success!' },
        onClose: jest.fn(),
    };

    it('renders notification message', () => {
        render(<NotificationBar {...baseProps} />);
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByTestId('notification-bar')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = jest.fn();
        render(<NotificationBar {...baseProps} onClose={onClose} />);
        fireEvent.click(screen.getByLabelText('Close notification'));
        expect(onClose).toHaveBeenCalled();
    });

    it('does not render when notification is null', () => {
        render(<NotificationBar {...baseProps} notification={null} />);
        expect(screen.queryByTestId('notification-bar')).toBeNull();
    });
});
