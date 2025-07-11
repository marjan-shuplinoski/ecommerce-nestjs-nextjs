import React from 'react';
import { RegisterForm } from '../../../features/auth/components/RegisterForm';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import type { RegisterCredentials } from '../../../features/auth/types/auth.types';

const RegisterPage: React.FC = () => {
    const { login } = useAuth();
    const handleRegister = (data: RegisterCredentials) => {
        // TODO: Call backend API, get token, set user
        login({ username: data.username, roles: ['user'] }, 'demo-token');
    };
    return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;
