import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {User} from "../models/user";

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<null|User>(null);
    const [isLoading, setIsLoading] = useState(true); // Pour gérer le chargement initial

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            // Idéalement, validez le token ici avec un appel API.
            // Exemple simplifié :
            const storedUser = localStorage.getItem('authUser'); // Supposons que vous stockez aussi l'user
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                throw Error('Invalid token');
                // Gérer le cas où le token existe mais pas l'user (ou appeler API pour le récupérer)
                // Exemple: fetchUserData(storedToken).then(userData => setUser(userData));
            }

        }
        setIsLoading(false); // Fin de la vérification initiale
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem('authToken', token); // Stocker le token
        localStorage.setItem('authUser', JSON.stringify(userData)); // Stocker les infos user
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setUser(null);
    };

    const isAuthenticated = !!user;

    // Ne pas rendre les enfants tant que la vérification initiale n'est pas terminée
    if (isLoading) {
        return <div>Chargement de l'authentification...</div>; // Ou un spinner, etc.
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};