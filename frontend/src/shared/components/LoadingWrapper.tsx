import React from 'react';

interface LoadingWrapperProps {
    isLoading: boolean;
    error?: string | null;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ isLoading, error, children, fallback }) => {
    if (isLoading) {
        return fallback || <div role="status">Loading...</div>;
    }
    if (error) {
        return <div role="alert" style={{ color: 'red' }}>{error}</div>;
    }
    return <>{children}</>;
};

export default LoadingWrapper;
