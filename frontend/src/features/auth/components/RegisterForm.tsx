import React from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterCredentials } from '../types/auth.types';

interface RegisterFormProps {
    onSubmit: (data: RegisterCredentials) => void;
    loading?: boolean;
    error?: string;
    notification?: { type: 'success' | 'error' | 'warning'; message: string };
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error, notification }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterCredentials>();
    const password = watch('password');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Register</h2>
            <div>
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input id="username" {...register('username', { required: 'Username is required' })} className="input input-bordered w-full" />
                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input id="email" type="email" {...register('email', { required: 'Email is required' })} className="input input-bordered w-full" />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input id="password" type="password" {...register('password', { required: 'Password is required' })} className="input input-bordered w-full" />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                <input id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Confirm your password', validate: value => value === password || 'Passwords do not match' })} className="input input-bordered w-full" />
                {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
            </div>
            {notification && (
                <div className={`p-2 rounded text-white bg-${notification.type === 'success' ? 'green' : notification.type === 'error' ? 'red' : 'orange'}-500`}>{notification.message}</div>
            )}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
    );
};
