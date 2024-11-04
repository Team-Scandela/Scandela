import { useState } from 'react';
import { SliderButtonContainer, SliderButtonButtonIcon, PannelContainer, Text } from './elements'
import { useTranslation } from 'react-i18next';

const HelpPannel = () => {
    const [isExtended, setIsExtended] = useState(false);

    const { t } = useTranslation();

    const handleSliderPannelClicked = () => {
        setIsExtended(!isExtended);
    }

    return (
        <div>
            <PannelContainer 
                show={isExtended}
            >
                {JSON.parse(localStorage.getItem('token')) && (
                    <Text fontSize={'18px'}>
                       {t('adminAccount')}
                    </Text>
                )}
                {!JSON.parse(localStorage.getItem('token')) && (
                    <Text fontSize={'20px'}>
                       {t('userAccount')}
                    </Text>
                )}
                {JSON.parse(localStorage.getItem('premium')) && (
                    <Text fontSize={'20px'}>
                       {t('premiumVersion')}
                    </Text>
                )}
                {!JSON.parse(localStorage.getItem('premium')) && (
                    <Text fontSize={'16px'}>
                       {t('demoVersion')}
                    </Text>
                )}
            </PannelContainer>
            <SliderButtonContainer
                show={isExtended}
                onClick={handleSliderPannelClicked}
            >
                <SliderButtonButtonIcon size={30}/>
            </SliderButtonContainer>
        </div>
    );
};

export default HelpPannel;
