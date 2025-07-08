import React, { createContext, useContext, ReactNode } from 'react';
import toast, { Toaster, ToastOptions, ToastBar } from 'react-hot-toast';

export type NotificationType = 'success' | 'error' | 'info' | 'loading';

export interface NotificationContextProps {
    notify: (message: string, type?: NotificationType, options?: ToastOptions) => void;
    notifySuccess: (message: string, options?: ToastOptions) => void;
    notifyError: (message: string, options?: ToastOptions) => void;
    notifyInfo: (message: string, options?: ToastOptions) => void;
    notifyLoading: (message: string, options?: ToastOptions) => void;
    dismiss: (toastId?: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const notify = (message: string, type: NotificationType = 'info', options?: ToastOptions) => {
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            case 'loading':
                toast.loading(message, options);
                break;
            default:
                toast(message, options);
        }
    };

    const notifySuccess = (message: string, options?: ToastOptions) => toast.success(message, options);
    const notifyError = (message: string, options?: ToastOptions) => toast.error(message, options);
    const notifyInfo = (message: string, options?: ToastOptions) => toast(message, options);
    const notifyLoading = (message: string, options?: ToastOptions) => toast.loading(message, options);
    const dismiss = (toastId?: string) => toast.dismiss(toastId);

    return (
        <NotificationContext.Provider
            value={{ notify, notifySuccess, notifyError, notifyInfo, notifyLoading, dismiss }}
        >
            {children}
            <Toaster
                position="top-center"
                gutter={12}
                toastOptions={{
                    duration: 4000,
                    style: { background: '#222', color: '#fff', fontWeight: 500 },
                    success: { style: { background: '#16a34a' } },
                    error: { style: { background: '#dc2626' } },
                }}
            >
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <>
                                {icon}
                                <span style={{ marginLeft: 8 }}>{message}</span>
                                {t.type !== 'loading' && (
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        style={{ marginLeft: 12, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                                        aria-label="Dismiss notification"
                                    >
                                        ×
                                    </button>
                                )}
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextProps => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
    return ctx;
};
