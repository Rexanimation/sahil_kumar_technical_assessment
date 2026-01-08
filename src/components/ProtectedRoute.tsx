import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const location = useLocation();
    const isAuthCallback = new URLSearchParams(location.search).get('auth') === 'success';

    if (!isAuthenticated && !isAuthCallback) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
