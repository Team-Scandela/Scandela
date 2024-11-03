import { useState } from 'react';
import {
    PremiumRectangle,
    PremiumContainer,
    PremiumTitle,
    CloseButton,
    MainTitle,
    MainText,
    PremiumButtonOnOffStyle,
    PremiumButtonOnOffText,
    SubmitButton,
    AdminButton,
    PremiumTextContainer,
    NeedDecoText,
} from './elements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { subscription } from '../../../utils/subscriptionUtils';

interface PremiumProps {
    closeToMainApp: () => void;
}

const Premium: React.FC<PremiumProps> = ({ closeToMainApp }) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    const { t } = useTranslation();

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await subscription();
            window.open(response.url);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAdminPremium = () => {
        if (localStorage.getItem('premium') === 'true')
            localStorage.setItem('premium', 'false');
        else if (localStorage.getItem('premium') === 'false')
            localStorage.setItem('premium', 'true');
        navigate('/scandela');
    };

    return (
        <PremiumContainer>
            <PremiumRectangle>
                <CloseButton onClick={closeToMainApp} />
                <PremiumTitle>Passez au premium</PremiumTitle>

                {!showForm && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <PremiumTextContainer>
                            <MainTitle>{t('titleBuyAdmin')}</MainTitle>
                            <MainText>{t('title2BuyAdmin')}</MainText>
                            <MainText>{t('title3BuyAdmin')}</MainText>
                            <MainText>{t('title4BuyAdmin')}</MainText>
                            <MainTitle>{t('title5BuyAdmin')}</MainTitle>
                            <MainText>{t('title6BuyAdmin')}</MainText>
                        </PremiumTextContainer>
                        <PremiumButtonOnOffStyle onClick={handleToggleForm}>
                            <PremiumButtonOnOffText>
                                {t('handleSubscription')}
                            </PremiumButtonOnOffText>
                        </PremiumButtonOnOffStyle>
                    </div>
                )}
                {showForm && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SubmitButton onClick={handleFormSubmit}>
                            {t('buy')}
                        </SubmitButton>
                        <NeedDecoText>
                            {t('needDeco')}
                        </NeedDecoText>
                        {localStorage.getItem('token') === 'true' && (
                            <AdminButton onClick={handleAdminPremium}>
                                {t('adminPremium')}
                            </AdminButton>
                        )}
                    </div>
                )}
            </PremiumRectangle>
        </PremiumContainer>
    );
};

export default Premium;
