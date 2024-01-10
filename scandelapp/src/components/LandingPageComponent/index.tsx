import * as React from 'react';
import { ScandelaText, TicketsImgBg, ScandelaImgBg, FAQImgBg, LogoutImgBg, PremiumImgBg,
ProfilImgBg, PortalLinkContainer, LogoContainer, TriangleContainerLeft,
TriangleContainerRight, PortalTitle} from './elements';
import logoYellow from '../../assets/logo-128x128-yellow.png';
import { useNavigate } from 'react-router-dom';
import PremiumPageComponent from './PremiumPageComponent';

/** Landing component page
 * @param {boolean} isPremiumActivated- Boolean
 * @param {function} handleToggleIsPremiumActivated - Function to set/unset the premium version
 */

interface LandingPageComponentProps {
    isPremiumActivated: boolean;
    handleToggleIsPremiumActivated: () => void;
}

const LandingPageComponent: React.FC<LandingPageComponentProps> = ({
    isPremiumActivated,
    handleToggleIsPremiumActivated,
}) => {
    const navigate = useNavigate();
    const [isMenuPageDisplayed, setIsMenuPageDisplayed] = React.useState(true);
    const [isPremiumPageDisplayed, setIsPremiumPageDisplayed] = React.useState(false);

    const handleLogScandela = () => {
        navigate('/scandela');
    };

    const handlePremiumButtonClicked = () => {
        setIsMenuPageDisplayed(!isMenuPageDisplayed);
        setIsPremiumPageDisplayed(!isPremiumPageDisplayed);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div>
            <ScandelaText>ScandeMenu</ScandelaText>
            <LogoContainer src={logoYellow} />
            <TriangleContainerLeft></TriangleContainerLeft>
            <TriangleContainerRight></TriangleContainerRight>
            {isMenuPageDisplayed && (
                <div>
                    <PortalLinkContainer top={'150px'} left={'380px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={PremiumImgBg} onClick={handlePremiumButtonClicked}>
                        <PremiumImgBg></PremiumImgBg>
                        <PortalTitle fontSize={'1.5rem'}>Premium</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'150px'} left={'600px'} width={'350px'} height={'350px'} borderRadius={'175px'} img={ScandelaImgBg} onClick={handleLogScandela}>
                        <ScandelaImgBg></ScandelaImgBg>
                        <PortalTitle fontSize={'3rem'}>Scandela</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'150px'} left={'970px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={ProfilImgBg}>
                        <ProfilImgBg></ProfilImgBg>
                        <PortalTitle fontSize={'1.5rem'}>Profil</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'400px'} left={'420px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={TicketsImgBg}>
                        <TicketsImgBg></TicketsImgBg>
                        <PortalTitle fontSize={'1.5rem'}>Tickets</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'530px'} left={'700px'} width={'150px'} height={'150px'} borderRadius={'75px'} img={LogoutImgBg} onClick={handleLogout}>
                        <LogoutImgBg></LogoutImgBg>
                        <PortalTitle fontSize={'1rem'}>Déconnection</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'400px'} left={'930px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={FAQImgBg}>
                        <FAQImgBg></FAQImgBg>
                        <PortalTitle fontSize={'1.5rem'}>FAQ</PortalTitle>
                    </PortalLinkContainer>
                </div>
            )}
            {isPremiumPageDisplayed && (
                <div>
                    <PremiumPageComponent isPremiumActivated={isPremiumActivated} handleToggleIsPremiumActivated={handleToggleIsPremiumActivated} handlePremiumButtonClicked={handlePremiumButtonClicked} ></PremiumPageComponent>
                </div>
            )}
        </div>
    );
};

export default LandingPageComponent;