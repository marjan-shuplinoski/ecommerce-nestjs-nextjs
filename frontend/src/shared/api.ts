// src/shared/api.ts
/**
 * API client configuration for the frontend.
 * Uses fetch with base URL from environment variable.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:5000/api';

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!res.ok) {
        // Optionally handle notification system here
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}
