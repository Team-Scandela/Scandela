import { useState } from 'react';
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

interface AbsencePannelProps {
    id: string;
    isDark: boolean;
}

const AbsencePannel: React.FC<AbsencePannelProps> = ({ id, isDark }) => {
    const [isAbsencePannelOpen, setIsAbsencePannelOpen] = useState(true);

    const handleToggleAbsencePannel = () => {
        setIsAbsencePannelOpen(!isAbsencePannelOpen);
    };

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
                        level={70}
                        oldLevel={50}
                        top={30}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={75}
                        oldLevel={85}
                        top={44}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={30}
                        oldLevel={20}
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
