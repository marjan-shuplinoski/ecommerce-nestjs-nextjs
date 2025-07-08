import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationProvider, useNotification } from './notification.context';

const TestComponent = () => {
    const { notifySuccess, notifyError, notifyInfo, notifyLoading, dismiss } = useNotification();
    return (
        <div>
            <button onClick={() => notifySuccess('Success!')}>Success</button>
            <button onClick={() => notifyError('Error!')}>Error</button>
            <button onClick={() => notifyInfo('Info!')}>Info</button>
            <button onClick={() => notifyLoading('Loading...')}>Loading</button>
            <button onClick={() => dismiss()}>Dismiss</button>
        </div>
    );
};

describe('NotificationContext', () => {
    it('renders and triggers notifications', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );
        fireEvent.click(screen.getByText('Success'));
        fireEvent.click(screen.getByText('Error'));
        fireEvent.click(screen.getByText('Info'));
        fireEvent.click(screen.getByText('Loading'));
        fireEvent.click(screen.getByText('Dismiss'));
        // No assertion: smoke test for errors
    });
});
