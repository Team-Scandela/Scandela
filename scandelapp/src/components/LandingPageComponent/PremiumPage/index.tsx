import { useState } from 'react';
import {
    PremiumPageContainer,
    MainTitle,
    MainText,
    PremiumButtonOnOffStyle,
    PremiumButtonOnOffText,
    FormField,
    SubmitButton,
    AdminButton,
    ReturnButtonContainer,
} from './elements';
import { subscription } from '../../../utils/subscriptionUtils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/** Premium page component
 * @param {function} handlePremiumButtonClicked - Function to show/hide premium page
 */
interface PremiumPageProps {
    handlePremiumButtonClicked: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({
    handlePremiumButtonClicked,
}) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        fullName: '',
        cardNumber: '',
        cardExpMonth: '',
        cardExpYear: '',
        cardCVC: '',
    });

    const { t } = useTranslation();

    const handleReturnButtonClicked = () => {
        handlePremiumButtonClicked();
    };

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
        <div>
            <PremiumPageContainer>
                {!showForm && (
                    <div>
                        <MainTitle>{t('titleBuyAdmin')}</MainTitle>
                        <MainText>{t('title2BuyAdmin')}</MainText>
                        <MainText>{t('title3BuyAdmin')}</MainText>
                        <MainText>{t('title4BuyAdmin')}</MainText>
                        <MainTitle>{t('title5BuyAdmin')}</MainTitle>
                        <MainText>{t('title6BuyAdmin')}</MainText>
                        <PremiumButtonOnOffStyle onClick={handleToggleForm}>
                            <PremiumButtonOnOffText>
                                {t('handleSubscription')}
                            </PremiumButtonOnOffText>
                        </PremiumButtonOnOffStyle>
                    </div>
                )}
                {showForm && (
                    <div>
                        <SubmitButton onClick={handleFormSubmit}>
                            {t('buy')}
                        </SubmitButton>
                        {localStorage.getItem('token') === 'true' && (
                            <AdminButton onClick={handleAdminPremium}>
                                {t('adminPremium')}
                            </AdminButton>
                        )}
                    </div>
                )}
            </PremiumPageContainer>
            <ReturnButtonContainer onClick={handleReturnButtonClicked} />
        </div>
    );
};

export default PremiumPage;
