import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingPageComponent from '../components/LoadingPage';

interface LoadingPageProps {}

/** Loading page of the app.
 *  Its a waiting page until all the required components are full load */
const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 20000); // 3 secondes

        return () => clearTimeout(timer); // Nettoyer le timer à la fin
        // const fetchData = async () => {
        //     try {
        //         // await getInitalData(); REMPLACER PAR TOUTES LES DATAS QUE L'ON VEUT
        //         setIsLoading(false);
        //     } catch (error) {
        //         console.error('Error during data fetching:', error);
        //     }
        // };

        // fetchData();
    }, [navigate('/landingpage')]);

    return (
        <div
            id={'loadingPage'}
            style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
        >
            <LoadingPageComponent isLoading={isLoading}/>
            
        </div>
    );
};

export default LoadingPage;
