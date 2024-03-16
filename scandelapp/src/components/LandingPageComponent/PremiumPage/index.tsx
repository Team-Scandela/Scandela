import { useState } from 'react';
import {
    PremiumPageContainer,
    MainTitle,
    MainText,
    PremiumButtonOnOffStyle,
    PremiumButtonOnOffText,
    FormField,
    SubmitButton,
    ReturnButtonContainer,
} from './elements';
import { userId } from '../../../utils/userUtils'

/** Premium page component
 * @param {function} handlePremiumButtonClicked - Function to show/hide premium page
 */
interface PremiumPageProps {
    handlePremiumButtonClicked: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({
    handlePremiumButtonClicked,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        fullName: '',
        cardNumber: '',
        cardExpMonth: '',
        cardExpYear: '',
        cardCVC: '',
    });

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

        const encodedCredentials = btoa('tester:T&st');
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        });

        try {
            const response = await fetch(
                'https://serverdela.onrender.com/subscription',
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        userid: userId,
                        ...formValues,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('La connexion a échoué');
            }

            const data = await response.json();
            // console.log(data);
            // updateUserInfo({ isPremiumActivated: true }); idée du résultat
        } catch (error) {
            console.error("Erreur lors de l'achat", error);
        }
    };

    return (
        <div>
            <PremiumPageContainer>
                {!showForm && (
                    <div>
                        <MainTitle>
                            Pourquoi choisir la version premium ?
                        </MainTitle>
                        <MainText>
                            Accédez à des conseils exclusifs qui vont bien au
                            delà de l'ordinaire !
                        </MainText>
                        <MainText>
                            Nos algorithmes perfectionnés analysent en
                            profondeur les données de votre parc lumineux afin
                            de vous offrir les conseils d'optimisation les plus
                            pointus.
                        </MainText>
                        <MainText>
                            Notre version premium déverouille de nouvelles
                            fonctionnalités avancées telles que les algorithmes
                            d'optimisations ou les indicateurs de performances.
                            Boostez votre capacité à prendre des décisions
                            éclairées pour l'éclairage public !
                        </MainText>
                        <MainTitle>Comment passer à Premium ?</MainTitle>
                        <MainText>
                            Cliquez simplement sur le bouton ci-dessous pour
                            passer à la version premium dès maintenant !
                        </MainText>
                        <PremiumButtonOnOffStyle onClick={handleToggleForm}>
                            <PremiumButtonOnOffText>
                                Acheter
                            </PremiumButtonOnOffText>
                        </PremiumButtonOnOffStyle>
                    </div>
                )}
                {showForm && (
                    <div>
                        <FormField
                            type="text"
                            name="fullName"
                            placeholder="Nom sur la carte"
                            value={formValues.fullName}
                            onChange={handleFormChange}
                        />
                        <FormField
                            type="number"
                            name="cardNumber"
                            placeholder="Numéro de carte"
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
                            placeholder="CVC"
                            value={formValues.cardCVC}
                            onChange={handleFormChange}
                        />
                        <SubmitButton onClick={handleFormSubmit}>
                            Soumettre
                        </SubmitButton>
                    </div>
                )}
            </PremiumPageContainer>
            <ReturnButtonContainer onClick={handleReturnButtonClicked} />
        </div>
    );
};

export default PremiumPage;
