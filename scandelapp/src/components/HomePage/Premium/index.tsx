import { useState, useEffect } from 'react';
import {
    PremiumRectangle,
    PremiumContainer,
    PremiumTitle,
    CloseButton,
    MainTitle,
    MainText,
    PremiumTextContainer,
    PremiumButtonOnOffStyle,
    PremiumButtonOnOffText,
    DescriptionPanel,
    DescriptionPanelText,
    BuyButton,
    CancelButton,
    ActionText,
} from './elements';
import { useTranslation } from 'react-i18next';
import {
    subscription,
    cancelSubscription,
} from '../../../utils/subscriptionUtils';
import { getUser, putUser } from '../../../utils/userUtils';
import { showToast } from '../../Toastr';

interface PremiumProps {
    closeToMainApp: () => void;
}

const Premium: React.FC<PremiumProps> = ({ closeToMainApp }) => {
    const [showForm, setShowForm] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const getUserInfoAsync = async () => {
            const userInfos = await getUser();
            setIsPremium(userInfos.premium);
        };
        getUserInfoAsync();
    }, []);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleBuyPremium = async (event: any) => {
        event.preventDefault();

        try {
            const response = await subscription();
            window.open(response.url);
        } catch (error) {
            console.log(error);
        }
        showToast(
            'success',
            t('buyPremiumValidation'),
            'top-left',
            5000,
            false,
            true,
            false,
            true
        );
    };

    const handleCancelPremium = async (event: any) => {
        event.preventDefault();

        try {
            await cancelSubscription();
        } catch (error) {
            console.log(error);
        }
        showToast(
            'success',
            t('cancelPremiumValidation'),
            'top-left',
            5000,
            false,
            true,
            false,
            true
        );
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
                        <DescriptionPanel>
                            <DescriptionPanelText>
                                {t('subscriptionDescription')}
                                <br />
                                {t('needDeco')}
                            </DescriptionPanelText>
                        </DescriptionPanel>
                        {!isPremium && (
                            <BuyButton onClick={handleBuyPremium}>
                                <ActionText>{t('buyPremium')}</ActionText>
                            </BuyButton>
                        )}
                        {isPremium && (
                            <CancelButton onClick={handleCancelPremium}>
                                <ActionText>{t('cancelPremium')}</ActionText>
                            </CancelButton>
                        )}
                    </div>
                )}
            </PremiumRectangle>
        </PremiumContainer>
    );
};

export default Premium;
