import { useState, useEffect } from 'react';

import {
    ModifyEntityButtonContainer,
    ModifyEntityPannelContainer,
    ButtonsMenuContainer,
    BulbButton,
    LampButton,
    ContentContainer,
    TitleText,
} from './elements';

import Bulb from './ModifyBulb';
import Lamp from './ModifyLamp';

import { FaLightbulb } from 'react-icons/fa';
import { GiDoubleStreetLights } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';

interface ModifyEntityButtonProps {
    isDark: boolean;
    decisionPanelExtended: boolean;
}

const ModifyEntityButton: React.FC<ModifyEntityButtonProps> = ({
    isDark,
    decisionPanelExtended,
}) => {
    const [isEntityPannelOpen, setIsEntityPannelOpen] = useState(false);
    const [currentEntitySelected, setCurrentEntitySelected] = useState('bulb');
    const { t } = useTranslation();

    useEffect(() => {
        if (decisionPanelExtended && isEntityPannelOpen)
            handleEntityButtonClick();
    });

    const handleEntityButtonClick = () => {
        setIsEntityPannelOpen(!isEntityPannelOpen);
    };

    return (
        <div>
            <ModifyEntityButtonContainer
                isDark={isDark}
                onClick={handleEntityButtonClick}
            ></ModifyEntityButtonContainer>
            {isEntityPannelOpen && (
                <ModifyEntityPannelContainer isDark={isDark}>
                    <ButtonsMenuContainer isDark={isDark}>
                        <BulbButton
                            isDark={isDark}
                            onClick={() => setCurrentEntitySelected('bulb')}
                        >
                            <FaLightbulb size={50} />
                        </BulbButton>
                        <LampButton
                            isDark={isDark}
                            onClick={() => setCurrentEntitySelected('lamp')}
                        >
                            <GiDoubleStreetLights size={50} />
                        </LampButton>
                    </ButtonsMenuContainer>
                    <ContentContainer isDark={isDark}>
                        {currentEntitySelected === 'bulb' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    {t('titleModifyBulbPannel')}
                                </TitleText>
                                <Bulb isDark={isDark} />
                            </div>
                        )}
                        {currentEntitySelected === 'lamp' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    {t('titleModifyLampPannel')}
                                </TitleText>
                                <Lamp isDark={isDark} />
                            </div>
                        )}
                    </ContentContainer>
                </ModifyEntityPannelContainer>
            )}
        </div>
    );
};

export default ModifyEntityButton;
