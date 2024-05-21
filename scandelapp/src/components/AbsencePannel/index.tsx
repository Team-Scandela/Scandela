import { useState, useEffect } from 'react';
import {
    AbsencePannelButtonContainer,
    PannelContainer,
    PannelText,
    CloseIcon,
    ListDetailContainer,
    WarningIcon,
    EventContainer,
    ArrowIcon,
    EventText,
    EventTextContainer,
    IndicatorsImage,
} from './elements';
import { PersonnalizedGauge } from '../Gauges';
import { GoInfo } from 'react-icons/go';
import { getAllScores } from '../../utils/gaugesUtils'

interface AbsencePannelProps {
    id: string;
    isDark: boolean;
}

const AbsencePannel: React.FC<AbsencePannelProps> = ({ id, isDark }) => {
    const [isAbsencePannelOpen, setIsAbsencePannelOpen] = useState(true);

    const handleToggleAbsencePannel = () => {
        setIsAbsencePannelOpen(!isAbsencePannelOpen);
    };

    const [levelElec, setLevelElec] = useState<number>(0);
    const [levelBio, setLevelBio] = useState<number>(0);
    const [levelLumi, setLevelLumi] = useState<number>(0);

    const [oldLevelElec, setOldLevelElec] = useState<number>(0);
    const [oldLevelBio, setOldLevelBio] = useState<number>(0);
    const [oldLevelLumi, setOldLevelLumi] = useState<number>(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const AllScores = await getAllScores();
            if (AllScores) {
                // Formatez les scores avec deux chiffres après la virgule
                const vegetalScore = AllScores.vegetalScore.toFixed(2);
                const consumptionScore = AllScores.consumptionScore.toFixed(2);
                const lightScore = AllScores.lightScore.toFixed(2);

                setLevelBio(vegetalScore)
                setLevelElec(consumptionScore)
                setLevelLumi(lightScore)
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <div>
            <AbsencePannelButtonContainer
                isDark={isDark}
                isOn={isAbsencePannelOpen}
                onClick={handleToggleAbsencePannel}
            >
                <GoInfo size={35} />
            </AbsencePannelButtonContainer>
            {isAbsencePannelOpen && (
                <PannelContainer isDark={isDark}>
                    <PannelText isDark={isDark}>
                        Pendant votre absence
                    </PannelText>

                    <ListDetailContainer isDark={isDark}>
                        <EventContainer isDark={isDark} top="10%">
                            <WarningIcon />

                            <EventTextContainer isDark={isDark}>
                                <EventText isDark={isDark}>
                                    Dérèglement du lampadaire 86 Rue Henri IV
                                </EventText>
                            </EventTextContainer>

                            <ArrowIcon isDark={isDark} />
                        </EventContainer>
                    </ListDetailContainer>

                    <PersonnalizedGauge
                        id={'ElecGaugesComponentId'}
                        isDark={isDark}
                        isElec={true}
                        isBio={false}
                        isLumi={false}
                        level={levelElec}
                        oldLevel={levelElec}
                        top={30}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={levelBio}
                        oldLevel={levelBio}
                        top={44}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={levelLumi}
                        oldLevel={levelLumi}
                        top={58}
                        left={63.5}
                    />
                    <CloseIcon
                        isDark={isDark}
                        onClick={handleToggleAbsencePannel}
                    />
                </PannelContainer>
            )}
        </div>
    );
};

export default AbsencePannel;
