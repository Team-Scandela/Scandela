import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllScores } from '../utils/gaugesUtils';
import { getAllLamps } from '../utils/lampUtils';
import LoadingPageComponent from '../components/LoadingPage';

/**
 * Props for the LoadingPage component.
 * @interface LoadingPageProps
 */
interface LoadingPageProps {}

/**
 * LoadingPage component - displays a loading screen until all required data is fetched.
 * 
 * @component
 * @param {LoadingPageProps} props - Props for LoadingPage component.
 * @returns {JSX.Element} The LoadingPage component.
 */
const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Fetches all required data (scores and lamps) and navigates to the landing page once done.
         * 
         * @async
         * @function fetchData
         */
        const fetchData = async () => {
            try {
                console.debug('Fetching data started');
                await Promise.all([
                    getAllScores(),
                    getAllLamps("VILLE (jsp comment faire pour la recup dans le local storage)")
                ]);
                setIsLoading(false);
                navigate('/landingpage');
                console.debug('Fetching data completed and navigation triggered');
            } catch (error) {
                console.error('Error during data fetching:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            id={'loadingPage'}
            style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
        >
            <LoadingPageComponent isLoading={isLoading} />
        </div>
    );
};

export default LoadingPage;
