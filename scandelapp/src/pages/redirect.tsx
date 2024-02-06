import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Redirect: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    // Use useEffect to redirect to the root path after a few seconds
    useEffect(() => {
        if (email) {
            fetch(
                'https://http://https://db.scandela.fr/emailConfirmation',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                }
            )
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
    }, [navigate]);

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
