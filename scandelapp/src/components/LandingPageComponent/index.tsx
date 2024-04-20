import { useState } from 'react';
import {
    ScandelaText,
    TicketsImgBg,
    ScandelaImgBg,
    FAQImgBg,
    LogoutImgBg,
    PremiumImgBg,
    ProfilImgBg,
    LockIcon,
    PortalLinkContainer,
    PortalLinkAdmin,
    LogoContainer,
    TriangleContainerLeft,
    TriangleContainerRight,
    PortalTitle,
    CrownIcon,
} from './elements';
import logoYellow from '../../assets/logo-128x128-yellow.png';
import { useNavigate } from 'react-router-dom';
import PremiumPage from './PremiumPage';
import TicketSenderPage from './TicketSenderPage';
import ProfilePage from './ProfilePage';
import FAQPage from './FAQPage';

/** Landing component page
 */

interface LandingPageComponentProps {}

const LandingPageComponent: React.FC<LandingPageComponentProps> = ({}) => {
    const navigate = useNavigate();
    const [isMenuPageDisplayed, setIsMenuPageDisplayed] = useState(true);
    const [isPremiumPageDisplayed, setIsPremiumPageDisplayed] = useState(false);
    const [isTicketPageDisplayed, setIsTicketPageDisplayed] = useState(false);
    const [isProfilePageDisplayed, setIsProfilePageDisplayed] = useState(false);
    const [isFAQPageDisplayed, setIsFAQPageDisplayed] = useState(false);

    const handleLogScandela = () => {
        navigate('/scandela');
    };

    const handleLogAdmin = () => {
        navigate('/admin');
    };

    const handlePremiumButtonClicked = () => {
        setIsMenuPageDisplayed(!isMenuPageDisplayed);
        setIsPremiumPageDisplayed(!isPremiumPageDisplayed);
    };

    const handleTicketButtonClicked = () => {
        if (localStorage.getItem('premium') === 'true') {
            setIsMenuPageDisplayed(!isMenuPageDisplayed);
            setIsTicketPageDisplayed(!isTicketPageDisplayed);
        }
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
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <ScandelaText>ScandeMenu</ScandelaText>
            <LogoContainer src={logoYellow} />
            <TriangleContainerLeft />
            <TriangleContainerRight />
            {isMenuPageDisplayed && (
                <div>
                    {localStorage.getItem('premium') === 'true' && (
                        <CrownIcon />
                    )}
                    <PortalLinkContainer
                        top={'21%'}
                        left={'25%'}
                        width={'200px'}
                        height={'200px'}
                        borderRadius={'100px'}
                        img={PremiumImgBg}
                        onClick={handlePremiumButtonClicked}
                    >
                        <PremiumImgBg />
                        <PortalTitle fontSize={'1.5rem'}>Premium</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer
                        top={'21%'}
                        left={'39%'}
                        width={'350px'}
                        height={'350px'}
                        borderRadius={'175px'}
                        img={ScandelaImgBg}
                        onClick={handleLogScandela}
                    >
                        <ScandelaImgBg />
                        <PortalTitle fontSize={'3rem'}>Scandela</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer
                        top={'21%'}
                        left={'63%'}
                        width={'200px'}
                        height={'200px'}
                        borderRadius={'100px'}
                        img={ProfilImgBg}
                        icon={LockIcon}
                        onClick={handleProfileButtonClicked}
                    >
                        <ProfilImgBg />
                        <PortalTitle fontSize={'1.5rem'}>Profil</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer
                        top={'54%'}
                        left={'27.5%'}
                        width={'200px'}
                        height={'200px'}
                        borderRadius={'100px'}
                        img={TicketsImgBg}
                        icon={LockIcon}
                        onClick={handleTicketButtonClicked}
                    >
                        <TicketsImgBg />
                        {localStorage.getItem('premium') === 'false' && (
                            <LockIcon />
                        )}
                        <PortalTitle fontSize={'1.5rem'}>Tickets</PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer
                        top={'72%'}
                        left={'45.5%'}
                        width={'150px'}
                        height={'150px'}
                        borderRadius={'75px'}
                        img={LogoutImgBg}
                        onClick={handleLogout}
                    >
                        <LogoutImgBg />
                        <PortalTitle fontSize={'1rem'}>
                            Déconnection
                        </PortalTitle>
                    </PortalLinkContainer>
                    <PortalLinkContainer
                        top={'54%'}
                        left={'60.5%'}
                        width={'200px'}
                        height={'200px'}
                        borderRadius={'100px'}
                        img={FAQImgBg}
                        onClick={handleFAQButtonClicked}
                    >
                        <FAQImgBg />
                        <PortalTitle fontSize={'1.5rem'}>FAQ</PortalTitle>
                    </PortalLinkContainer>
                    {localStorage.getItem('token') === 'true' && (
                        <PortalLinkAdmin onClick={handleLogAdmin}>
                            Admin
                        </PortalLinkAdmin>
                    )}
                </div>
            )}
            {isPremiumPageDisplayed && (
                <div>
                    <PremiumPage
                        handlePremiumButtonClicked={handlePremiumButtonClicked}
                    ></PremiumPage>
                </div>
            )}
            {isTicketPageDisplayed && (
                <div>
                    <TicketSenderPage
                        handleTicketButtonClicked={handleTicketButtonClicked}
                    ></TicketSenderPage>
                </div>
            )}
            {isProfilePageDisplayed && (
                <div>
                    <ProfilePage
                        handleProfileButtonClicked={handleProfileButtonClicked}
                    ></ProfilePage>
                </div>
            )}
            {isFAQPageDisplayed && (
                <div>
                    <FAQPage
                        handleFAQButtonClicked={handleFAQButtonClicked}
                    ></FAQPage>
                </div>
            )}
        </div>
    );
};

export default LandingPageComponent;
