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
            getAllLamps('VILLE', setLamps, setIsLoadingLamps, setError);
        }

        // Fetch scores if they are not loaded yet
        if (isLoadingScores) {
            console.debug('Fetching scores data...');
            getAllScores()
                .then(() => {
                    setIsLoadingScores(false);
                })
                .catch((error) => {
                    setErrorScores(error.message);
                });
        }

        if (!isLoadingLamps && !isLoadingScores && lamps.length > 0) {
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