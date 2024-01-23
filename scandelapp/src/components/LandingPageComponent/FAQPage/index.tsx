import {
    FAQPageContainer,
    MainTitle,
    MainText,
    ReturnButtonContainer,
} from './elements';

/** FAQ page component
 * @param {function} handleFAQButtonClicked - Function to show/hide premium page
 */

interface FAQPagePros {
    handleFAQButtonClicked: () => void;
}

const FAQPage: React.FC<FAQPagePros> = ({ handleFAQButtonClicked }) => {
    const handleReturnButtonClicked = () => {
        handleFAQButtonClicked();
    };

    return (
        <div>
            <FAQPageContainer>
                <MainText top={'40%'}>PROCHAINEMENT...</MainText>
            </FAQPageContainer>
            <ReturnButtonContainer onClick={handleReturnButtonClicked}>
                Return
            </ReturnButtonContainer>
        </div>
    );
};

export default FAQPage;
