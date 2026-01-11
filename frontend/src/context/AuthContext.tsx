import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
    email: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            // Note: We must include credentials to send the HttpOnly cookie
            const res = await fetch(`${apiUrl}/auth/me`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await fetch(`${apiUrl}/auth/logout`, { method: 'POST', credentials: 'include' });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
