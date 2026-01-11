import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Check if we are freshly redirected from OAuth
    const isAuthCallback = new URLSearchParams(location.search).get('auth') === 'success';

    if (loading) {
        return <div>Loading...</div>; // Or a proper spinner component
    }

    if (!user && !isAuthCallback) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
