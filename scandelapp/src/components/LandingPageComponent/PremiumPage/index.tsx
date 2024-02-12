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

/** Premium page component
 * @param {boolean} isPremiumActivated - Boolean
 * @param {function} handleToggleIsPremiumActivated - Function to set/unset the premium version
 * @param {function} handlePremiumButtonClicked - Function to show/hide premium page
 */
interface PremiumPageProps {
  isPremiumActivated: boolean;
  handleToggleIsPremiumActivated: () => void;
  handlePremiumButtonClicked: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({
  isPremiumActivated,
  handleToggleIsPremiumActivated,
  handlePremiumButtonClicked,
}) => {
    const [showForm, setShowForm] = useState(false);

  const handleReturnButtonClicked = () => {
    handlePremiumButtonClicked();
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = () => {

  };

  return (
    <div>
      <PremiumPageContainer >
        {!showForm && (
            <div>
                <MainTitle>Pourquoi choisir la version premium ?</MainTitle>
                <MainText>
                Accédez à des conseils exclusifs qui vont bien au delà de l'ordinaire !
                </MainText>
                <MainText>
                Nos algorithmes perfectionnés analysent en profondeur les données de votre parc lumineux afin de vous offrir les conseils d'optimisation les plus pointus.
                </MainText>
                <MainText>
                Notre version premium déverouille de nouvelles fonctionnalités avancées telles que les algorithmes d'optimisations ou les indicateurs de performances. Boostez votre capacité à prendre des décisions éclairées pour l'éclairage public !
                </MainText>
                <MainTitle>Comment passer à Premium ?</MainTitle>
                <MainText>
                Cliquez simplement sur le bouton ci-dessous pour passer à la version premium dès maintenant !
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
            <FormField type="text" placeholder="Nom sur la carte" />
            <FormField type="number" placeholder="Numéro de carte" />
            <FormField type="month" placeholder="Date d'expiration" />
            <FormField type="number" placeholder="CVV" />
            <SubmitButton onClick={handleFormSubmit}>Soumettre</SubmitButton>
        </div>
      )}
      </PremiumPageContainer>
      <ReturnButtonContainer onClick={handleReturnButtonClicked} />
    </div>
  );
};

export default PremiumPage;
