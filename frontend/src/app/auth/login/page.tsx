import React from 'react';
import { LoginForm } from '../../../features/auth/components/LoginForm';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import type { AuthCredentials } from '../../../features/auth/types/auth.types';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const handleLogin = (data: AuthCredentials) => {
        // TODO: Call backend API, get token, set user
        login({ username: data.email, roles: ['user'] }, 'demo-token');
    };
    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
