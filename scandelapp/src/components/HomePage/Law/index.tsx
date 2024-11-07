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
import scandelapp from '../../../assets/homepage/loiCover.png';

interface StatsProps {
    closeToMainApp: () => void;
}

const Stats: React.FC<StatsProps> = ({ closeToMainApp }) => {
    const navigate = useNavigate();

    const handleStatsClick = () => {
        navigate('/Laws');
    };

    const text =
        "Scandela vous apporte une aider sur les règlementations, loi et aide qui sont disponible dans votre région. Nous vous avons préparer un pdf que vous pouvez télécharger. Vous pouvez également vous rendre sur chacune de nos sources grace au différent lien. Nous sommes perpétuellement en train d'ajouter des fonctionnalité sur cette page n'hésitez pas à nous faire des retours";

    return (
        <StatsContainer>
            <StatsRectangle>
                <StatsTitle>Loi & Aide</StatsTitle>
                <CloseButton onClick={closeToMainApp} />
                <StatsPart left={'2.5%'} width={'55%'}>
                    <StatsImage src={scandelapp} />
                </StatsPart>
                <StatsTextContainer left={'60%'} width={'37.5%'}>
                    <StatsText dangerouslySetInnerHTML={{ __html: text }} />
                    <StatsButton onClick={handleStatsClick}>
                        Accéder aux Lois et aux Aides !
                    </StatsButton>
                </StatsTextContainer>
            </StatsRectangle>
        </StatsContainer>
    );
};

export default Stats;
