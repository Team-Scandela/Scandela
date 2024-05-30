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

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'cardExpirationDate') {
            const [year, month] = value.split('-');
            setFormValues((prev) => ({
                ...prev,
                cardExpMonth: month,
                cardExpYear: year,
            }));
        } else {
            setFormValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleReturnButtonClicked = () => {
        handlePremiumButtonClicked();
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        const response = await subscription(formValues);
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
                                {t('buy')}
                            </PremiumButtonOnOffText>
                        </PremiumButtonOnOffStyle>
                    </div>
                )}
                {showForm && (
                    <div>
                        <FormField
                            type="text"
                            name="fullName"
                            placeholder={t('nameOnTheMap')}
                            value={formValues.fullName}
                            onChange={handleFormChange}
                        />
                        <FormField
                            type="number"
                            name="cardNumber"
                            placeholder={t('cardNumber')}
                            value={formValues.cardNumber}
                            onChange={handleFormChange}
                        />
                        <FormField
                            type="month"
                            name="cardExpirationDate"
                            placeholder="Date d'expiration"
                            onChange={handleFormChange}
                        />
                        <FormField
                            type="number"
                            name="cardCVC"
                            placeholder={t('cvc')}
                            value={formValues.cardCVC}
                            onChange={handleFormChange}
                        />
                        <SubmitButton onClick={handleFormSubmit}>
                            {t('send')}
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
