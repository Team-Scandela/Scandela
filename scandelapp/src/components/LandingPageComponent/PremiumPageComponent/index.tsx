import * as React from 'react';
import { PremiumPageContainer, MainTitle, MainText, PremiumButtonOnOffStyle, PremiumButtonOnOffText, ReturnButtonContainer } from './elements';

/** Premium page component
 * @param {boolean} isPremiumActivated - Boolean
 * @param {function} handleToggleIsPremiumActivated - Function to set/unset the premium version
 * @param {function} handlePremiumButtonClicked - Function to show/hide premium page
 */

interface PremiumPageComponentProps {
    isPremiumActivated: boolean;
    handleToggleIsPremiumActivated: () => void;
    handlePremiumButtonClicked: () => void;
}

const PremiumPageComponent: React.FC<PremiumPageComponentProps> = ({
    isPremiumActivated,
    handleToggleIsPremiumActivated,
    handlePremiumButtonClicked,
}) => {

    const handleReturnButtonClicked = () => {
        handlePremiumButtonClicked();
    };

    return (
        <div>
            <PremiumPageContainer>
                <MainTitle top={'5%'}>Pourquoi choisir la version premium ?</MainTitle>
                <MainText top={'12%'}>Accédez à des conseils exclusifs qui vont bien au delà de l'ordinaire ! </MainText>
                <MainText top={'20%'}>Nos algorithmes perfectionnés analysent en profondeur les données de votre parc lumineux afin de vous offrir les conseils d'optimisation les plus pointus. </MainText>
                <MainText top={'35%'}>Notre version premium déverouille de nouvelles fonctionnalités avancées telles que les algorithmes d'optimisations ou les indicateurs de performances .
                Boostez votre capacité à prendre des décisions éclairées pour l'éclairage public !</MainText>
                <MainTitle top={'58%'}>Comment passer à Premium ?</MainTitle>
                <MainText top={'65%'}>Cliquez simplement sur le bouton ci-dessous pour passer à la version premium dès maintenant !</MainText>
                <PremiumButtonOnOffStyle
                        onClick={() => handleToggleIsPremiumActivated()}
                    >
                        <PremiumButtonOnOffText>
                            {isPremiumActivated
                                ? 'Désactiver la version premium'
                                : 'Activer la version premium'}
                        </PremiumButtonOnOffText>
                    </PremiumButtonOnOffStyle>
            </PremiumPageContainer>
            <ReturnButtonContainer onClick={handleReturnButtonClicked}>Return</ReturnButtonContainer>
        </div>
    );
};

export default PremiumPageComponent;