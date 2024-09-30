import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = localStorage.getItem('token'); // on prend le token dans le local storage pour check si l'utilisateur est login mais à terme il faudra un peu plus sécurisé

    return isAuthenticated ? children : <Navigate to="/" />; // si l'utilisateur est login on retourne le composant sinon on le redirige vers la page de login
};

export default PrivateRoute;
