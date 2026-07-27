import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // টোকেন না থাকলে লগইন পেজে পাঠিয়ে দেবে
        return <Navigate to="/user/login" replace />;
    }

    return children;
};

export default ProtectedRoute;