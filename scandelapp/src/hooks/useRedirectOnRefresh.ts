import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate, useLocation } from 'react-router-dom';
import { lampsAtom } from '../atoms/lampsAtom'; // Assurez-vous d'importer votre atom Jotai

export const useRedirectOnRefresh = () => {
    const lamps = useAtomValue(lampsAtom);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/' && (!lamps || lamps.length === 0)) {
            navigate('/loadingpage');
        }
    }, [lamps, location, navigate]);
};