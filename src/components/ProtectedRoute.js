import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('User is not authenticated');

        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoute;