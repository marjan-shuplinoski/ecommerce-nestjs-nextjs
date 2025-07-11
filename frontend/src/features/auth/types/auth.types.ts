export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends AuthCredentials {
    confirmPassword: string;
    username: string;
}

export interface ResetPasswordCredentials {
    email: string;
}

export type AuthNotificationType = 'success' | 'error' | 'warning';

export interface AuthUser {
    username: string;
    email?: string;
    roles: string[];
}

export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (user: AuthUser, token: string) => void;
    logout: () => void;
}
