import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Redirect component used for email confirmation redirection.
 * 
 * @component
 * @returns {JSX.Element} The Redirect component.
 */
const Redirect: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    /**
     * Effect to handle email confirmation and automatic redirection.
     * Redirects to the root path after 3 seconds if an email is present in query parameters.
     */
    useEffect(() => {
        if (email) {
            const urlRequest =
                'https://http://' +
                process.env.REACT_APP_BACKEND_URL +
                'emailConfirmation';
            fetch(urlRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('User registered successfully.');
                    } else {
                        console.error('Error registering user.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        const redirectTimeout = setTimeout(() => {
            navigate('/');
        }, 3000); // Redirect after 3 seconds

        // Clear the timeout if the component unmounts
        return () => clearTimeout(redirectTimeout);
    }, [navigate, email]);

    return (
        <div style={{ backgroundColor: '#fff', height: '200vh' }}>
            <p>
                Thank you for confirming your registration to Scandela. Welcome!
            </p>
            <p>Redirecting. . . . .</p>
        </div>
    );
};

export default Redirect;
