import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si authentifié, rend le composant enfant de la route
    return <Outlet />;
};

export default ProtectedRoute;