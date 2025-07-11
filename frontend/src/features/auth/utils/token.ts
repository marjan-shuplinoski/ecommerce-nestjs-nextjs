export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('jwt_token');
};

export const setToken = (token: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('jwt_token', token);
};

export const removeToken = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('jwt_token');
};
