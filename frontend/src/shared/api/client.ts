import axios, { AxiosInstance, AxiosError, AxiosHeaders } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { notifyApiError } from '../notifications/notification.service';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function getApiInstance(): AxiosInstance {
    const api: AxiosInstance = axios.create({
        baseURL,
        timeout: 10000,
        withCredentials: true,
    });

    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Attach auth token if available (example)
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (token) {
                if (!config.headers) config.headers = new AxiosHeaders();
                config.headers.set('Authorization', `Bearer ${token}`);
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            notifyApiError(error);
            return Promise.reject(error);
        }
    );

    return api;
}
