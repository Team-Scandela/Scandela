import React from 'react'; // Import the 'React' module

import {
    StatsRectangle,
    StatsContainer,
    StatsTextContainer,
    StatsButton,
    CloseButton,
    StatsText,
    StatsImage,
    StatsPart,
    StatsTitle,
} from './elements';
import { useNavigate } from 'react-router-dom';
import scandelapp from '../../../assets/homepage/scandelapp.png';

interface StatsProps {
    closeToMainApp: () => void;
}

const Stats: React.FC<StatsProps> = ({ closeToMainApp }) => {
    const navigate = useNavigate();

    const handleStatsClick = () => {
        navigate('/statistics');
    };

    const text =
        'Scandela vous permet de visualiser les statistiques de votre territoire. Vous pouvez consulter les données de votre territoire, les comparer avec d’autres territoires et suivre l’évolution de la situation.';

    return (
        <StatsContainer>
            <StatsRectangle>
                <StatsTitle>Statistiques</StatsTitle>
                <CloseButton onClick={closeToMainApp} />
                <StatsTextContainer left={'100%'} width={'100%'}>
                    <StatsText dangerouslySetInnerHTML={{ __html: text }} />
                    <StatsButton onClick={handleStatsClick}>
                        Accéder au statistiques de votre territoire
                    </StatsButton>
                </StatsTextContainer>
            </StatsRectangle>
        </StatsContainer>
    );
};

export default Stats;