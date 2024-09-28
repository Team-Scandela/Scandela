import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { getAllLamps } from '../utils/lampUtils';
import { getAllScores } from '../utils/gaugesUtils'; // Assuming this is the correct import
import { lampsAtom, isLoadingAtom, errorAtom } from '../atoms/lampsAtom';
import LoadingPageComponent from '../components/LoadingPage';

const LoadingPage: React.FC = () => {
    const navigate = useNavigate();

    // Jotai atoms for lamps
    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isLoadingLamps, setIsLoadingLamps] = useAtom(isLoadingAtom);
    const [error, setError] = useAtom(errorAtom);

    // Local state for scores loading
    const [isLoadingScores, setIsLoadingScores] = useState(true);
    const [errorScores, setErrorScores] = useState<string | null>(null);

    useEffect(() => {
        // Fetch lamps if they are not loaded yet
        if (isLoadingLamps && lamps.length === 0) {
            console.debug('Fetching lamps data...');
            getAllLamps('VILLE', setLamps, setIsLoadingLamps, setError);
        }

        // Fetch scores if they are not loaded yet
        if (isLoadingScores) {
            console.debug('Fetching scores data...');
            getAllScores()
                .then(() => {
                    setIsLoadingScores(false); // Indiquer que les scores sont chargés
                })
                .catch((error) => {
                    console.error('Error during score fetching:', error);
                    setErrorScores(error.message);
                });
        }

        // If both lamps and scores are loaded, navigate to the homepage
        if (!isLoadingLamps && !isLoadingScores && lamps.length > 0) {
            console.debug('Both lamps and scores loaded. Navigating...');
            navigate('/homepage');
        }
    }, [isLoadingLamps, isLoadingScores, lamps, navigate, setLamps, setIsLoadingLamps, setError]);

    return (
        <div id="loadingPage" style={{ backgroundColor: '#2A2B2A', height: '100vh' }}>
            {error || errorScores ? (
                <div>
                    Error: {error ?? errorScores}
                </div>
            ) : (
                <LoadingPageComponent isLoading={isLoadingLamps || isLoadingScores} />
            )}
        </div>
    );
};

export default LoadingPage;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { getAllScores } from '../utils/gaugesUtils';
// import { getAllLamps } from '../utils/lampUtils';
// import LoadingPageComponent from '../components/LoadingPage';

// /**
//  * Props for the LoadingPage component.
//  * @interface LoadingPageProps
//  */
// interface LoadingPageProps {}

// // External variable to lock the data fetching process
// let isFetching = false;

// /**
//  * LoadingPage component - displays a loading screen until all required data is fetched.
//  *
//  * @component
//  * @param {LoadingPageProps} props - Props for LoadingPage component.
//  * @returns {JSX.Element} The LoadingPage component.
//  */
// const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [dataLoaded, setDataLoaded] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!dataLoaded && !isFetching) {
//             isFetching = true;
//             console.debug('useEffect triggered');
//             /**
//              * Fetches all required data (scores and lamps) and navigates to the landing page once done.
//              *
//              * @async
//              * @function fetchData
//              */
//             const fetchData = async () => {
//                 try {
//                     console.debug('Fetching data started');
//                     await Promise.all([
//                         getAllScores(),
//                         getAllLamps('VILLE'), // Assuming "VILLE" is the correct parameter here
//                     ]);
//                     setIsLoading(false);
//                     setDataLoaded(true);
//                     console.debug('Fetching data completed');
//                     navigate('/homepage');
//                     console.debug('Navigation triggered');
//                 } catch (error) {
//                     console.error('Error during data fetching:', error);
//                 }
//             };

//             fetchData();
//         }
//     }, [dataLoaded, navigate]);

//     return (
//         <div
//             id={'loadingPage'}
//             style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
//         >
//             <LoadingPageComponent isLoading={isLoading} />
//         </div>
//     );
// };

// export default LoadingPage;
