import { Navigate } from 'react-router-dom'; // Assumindo que você usa react-router-dom
import { useAuth } from './authContext';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function PrivateRoute({ children }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" replace />;
}