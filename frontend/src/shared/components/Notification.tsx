import React from 'react';
import { Notification, NotificationType } from '../hooks/useNotification';

export interface NotificationBarProps {
    notification: Notification | null;
    onClose: () => void;
}

const typeToColor: Record<NotificationType, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-400',
};

export const NotificationBar: React.FC<NotificationBarProps> = ({ notification, onClose }) => {
    if (!notification) return null;
    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50 ${typeToColor[notification.type]}`}
            role="alert"
            aria-live="assertive"
            data-testid="notification-bar"
        >
            <span>{notification.message}</span>
            <button
                className="ml-4 text-white font-bold focus:outline-none"
                onClick={onClose}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};

export default NotificationBar;
