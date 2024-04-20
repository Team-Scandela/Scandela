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
    isAddEntityPannelOpen: boolean;
    handleAddEntityButtonClick: () => void;
    decisionPanelExtended: boolean;
}

const AddEntityButton: React.FC<AddEntityButtonProps> = ({
    isDark,
    isAddEntityPannelOpen,
    handleAddEntityButtonClick,
    decisionPanelExtended,
}) => {
    const [currentEntitySelected, setCurrentEntitySelected] = useState('bulb');
    const { t } = useTranslation();

    useEffect(() => {
        if (decisionPanelExtended && isAddEntityPannelOpen)
            handleAddEntityButtonClick();
    });

    return (
        <div>
            <AddEntityButtonContainer
                isDark={isDark}
                isOn={isAddEntityPannelOpen}
                onClick={handleAddEntityButtonClick}
            ></AddEntityButtonContainer>
            {isAddEntityPannelOpen && (
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
