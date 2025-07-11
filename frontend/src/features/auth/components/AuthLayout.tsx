import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            {children}
        </div>
    </div>
);
