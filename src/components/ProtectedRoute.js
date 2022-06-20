import { Navigate } from "react-router-dom";
import { useAuth } from './auth';

export const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    if (!auth.value.user || (auth.value.user.userName !== "test" || auth.value.user.password !== "123")) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};