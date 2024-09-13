import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    user: { email: string; role: string } | null;
    login: (email: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ email: string; role: string } | null>(null);

    const login = (email: string, role: string) => {
        setUser({ email, role });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
