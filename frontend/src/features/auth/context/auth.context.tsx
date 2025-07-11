"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType } from '../types/auth.types';
import { getToken, setToken, removeToken } from '../utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) {
            // TODO: fetch user from backend using token
            setUser({ username: 'demo', roles: ['user'] });
        }
        setLoading(false);
    }, []);

    const login = (user: AuthUser, token: string) => {
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
    return ctx;
};
