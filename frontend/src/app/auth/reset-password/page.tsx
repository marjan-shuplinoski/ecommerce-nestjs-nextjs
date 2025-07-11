import React from 'react';
import { ResetPasswordForm } from '../../../features/auth/components/ResetPasswordForm';
import type { ResetPasswordCredentials } from '../../../features/auth/types/auth.types';

const ResetPasswordPage: React.FC = () => {
    const handleReset = (data: ResetPasswordCredentials) => {
        // TODO: Call backend API for reset
        alert('Reset link sent to ' + data.email);
    };
    return <ResetPasswordForm onSubmit={handleReset} />;
};

export default ResetPasswordPage;
