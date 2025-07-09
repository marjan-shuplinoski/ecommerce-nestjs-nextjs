import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
    type: NotificationType;
    message: string;
}

interface NotificationContextProps {
    notification: Notification | null;
    showNotification: (notification: Notification) => void;
    clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const showNotification = (notification: Notification) => setNotification(notification);
    const clearNotification = () => setNotification(null);

    return React.createElement(
        NotificationContext.Provider,
        { value: { notification, showNotification, clearNotification } },
        children
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within a NotificationProvider');
    return context;
};
