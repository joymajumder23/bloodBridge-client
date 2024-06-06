import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Skeleton from "../Shared/Skeleton/Skeleton";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();

    if (loading) {
        return <Skeleton></Skeleton>;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;