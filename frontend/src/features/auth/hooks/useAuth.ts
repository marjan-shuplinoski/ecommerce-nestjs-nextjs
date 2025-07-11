import { useAuthContext } from '../context/auth.context';

export const useAuth = () => {
    const { user, loading, login, logout } = useAuthContext();
    return { user, loading, login, logout };
};
