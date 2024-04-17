import { useState, useEffect } from 'react';

import {
    AddEntityButtonContainer,
    AddEntityPannelContainer,
    ButtonsMenuContainer,
    BulbButton,
    LampButton,
    ContentContainer,
    TitleText,
} from './elements';

import Bulb from './AddBulb';
import Lamp from './AddLamp';

import { FaLightbulb } from 'react-icons/fa';
import { GiDoubleStreetLights } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';

interface AddEntityButtonProps {
    isDark: boolean;
    decisionPanelExtended: boolean;
}

const AddEntityButton: React.FC<AddEntityButtonProps> = ({
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
            <AddEntityButtonContainer
                isDark={isDark}
                onClick={handleEntityButtonClick}
            ></AddEntityButtonContainer>
            {isEntityPannelOpen && (
                <AddEntityPannelContainer isDark={isDark}>
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
                                    {t('titleAddBulbPannel')}
                                </TitleText>
                                <Bulb isDark={isDark} />
                            </div>
                        )}
                        {currentEntitySelected === 'lamp' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    {t('titleAddLampPannel')}
                                </TitleText>
                                <Lamp isDark={isDark} />
                            </div>
                        )}
                    </ContentContainer>
                </AddEntityPannelContainer>
            )}
        </div>
    );
};

export default AddEntityButton;
