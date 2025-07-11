import React from 'react';
import { useForm } from 'react-hook-form';
import type { ResetPasswordCredentials } from '../types/auth.types';

interface ResetPasswordFormProps {
    onSubmit: (data: ResetPasswordCredentials) => void;
    loading?: boolean;
    error?: string;
    notification?: { type: 'success' | 'error' | 'warning'; message: string };
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, loading, error, notification }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordCredentials>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Reset Password</h2>
            <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input id="email" type="email" {...register('email', { required: 'Email is required' })} className="input input-bordered w-full" />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            {notification && (
                <div className={`p-2 rounded text-white bg-${notification.type === 'success' ? 'green' : notification.type === 'error' ? 'red' : 'orange'}-500`}>{notification.message}</div>
            )}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
        </form>
    );
};
