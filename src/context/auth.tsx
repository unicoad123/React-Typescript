import React, { createContext, useState,ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string;
    login: (token: string) => void;
    logout: () => void;
}
interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    token: '',
    login: () => { },
    logout: () => { },
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');

    // Function to handle login
    const login = (token: string) => {
        setToken(token);
        setIsAuthenticated(true);
    };

    // Function to handle logout
    const logout = () => {
        setToken('');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
