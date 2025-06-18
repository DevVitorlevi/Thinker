import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    return user ? children : <Navigate to="/login" />;
};
