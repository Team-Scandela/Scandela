import * as React from 'react';
import { ScandelaText, TicketsImgBg, ScandelaImgBg, FAQImgBg, LogoutImgBg, PremiumImgBg,
ProfilImgBg, PortalLinkContainer, LogoContainer, TriangleContainerLeft,
TriangleContainerRight, PortalTitle} from './elements';
import logoYellow from '../../assets/logo-128x128-yellow.png';
import { useNavigate } from 'react-router-dom';
import PremiumPage from './PremiumPage';
import TicketSenderPage from './TicketSenderPage';
import ProfilePage from './ProfilePage';
import FAQPage from './FAQPage';

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
    const [isTicketPageDisplayed, setIsTicketPageDisplayed] = React.useState(false);
    const [isProfilePageDisplayed, setIsProfilePageDisplayed] = React.useState(false);
    const [isFAQPageDisplayed, setIsFAQPageDisplayed] = React.useState(false);

    const handleLogScandela = () => {
        navigate('/scandela');
    };

    const handlePremiumButtonClicked = () => {
        setIsMenuPageDisplayed(!isMenuPageDisplayed);
        setIsPremiumPageDisplayed(!isPremiumPageDisplayed);
    };

    const handleTicketButtonClicked = () => {
        setIsMenuPageDisplayed(!isMenuPageDisplayed);
        setIsTicketPageDisplayed(!isTicketPageDisplayed);
    };

    const handleProfileButtonClicked = () => {
        setIsMenuPageDisplayed(!isMenuPageDisplayed);
        setIsProfilePageDisplayed(!isProfilePageDisplayed);
    };

    const handleFAQButtonClicked = () => {
        setIsMenuPageDisplayed(!isMenuPageDisplayed);
        setIsFAQPageDisplayed(!isFAQPageDisplayed);
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
                    <PortalLinkContainer top={'150px'} left={'970px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={ProfilImgBg} onClick={handleProfileButtonClicked}>
                        <ProfilImgBg></ProfilImgBg>
                        <PortalTitle fontSize={'1.5rem'}>Profil</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'400px'} left={'420px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={TicketsImgBg} onClick={handleTicketButtonClicked}>
                        <TicketsImgBg></TicketsImgBg>
                        <PortalTitle fontSize={'1.5rem'}>Tickets</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'530px'} left={'700px'} width={'150px'} height={'150px'} borderRadius={'75px'} img={LogoutImgBg} onClick={handleLogout}>
                        <LogoutImgBg></LogoutImgBg>
                        <PortalTitle fontSize={'1rem'}>Déconnection</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer top={'400px'} left={'930px'} width={'200px'} height={'200px'} borderRadius={'100px'} img={FAQImgBg} onClick={handleFAQButtonClicked}>
                        <FAQImgBg></FAQImgBg>
                        <PortalTitle fontSize={'1.5rem'}>FAQ</PortalTitle>
                    </PortalLinkContainer>
                </div>
            )}
            {isPremiumPageDisplayed && (
                <div>
                    <PremiumPage isPremiumActivated={isPremiumActivated} handleToggleIsPremiumActivated={handleToggleIsPremiumActivated} handlePremiumButtonClicked={handlePremiumButtonClicked} ></PremiumPage>
                </div>
            )}
            {isTicketPageDisplayed && (
                <div>
                    <TicketSenderPage handleTicketButtonClicked={handleTicketButtonClicked}></TicketSenderPage>
                </div>
            )}
            {isProfilePageDisplayed && (
                <div>
                    <ProfilePage handleProfileButtonClicked={handleProfileButtonClicked}></ProfilePage>
                </div>
            )}
            {isFAQPageDisplayed && (
                <div>
                    <FAQPage handleFAQButtonClicked={handleFAQButtonClicked}></FAQPage>
                </div>
            )}
        </div>
    );
};

export default LandingPageComponent;