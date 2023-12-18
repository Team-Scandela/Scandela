import * as React from 'react';
import { ScandelaText, TicketsImgBg, ScandelaImgBg, FAQImgBg, AdminImgBg, PremiumImgBg,
ProfilImgBg, PortalLinkContainer, LogoContainer, LogoutButtonContainer, TriangleContainerLeft,
TriangleContainerRight, PortalTitle } from './elements';
import logoYellow from '../../assets/logo-128x128-yellow.png';
import { useNavigate } from 'react-router-dom';

/** Landing component page
 *
 */

interface LandingPageComponentProps {
}

const LandingPageComponent: React.FC<LandingPageComponentProps> = ({ }) => {
    const navigate = useNavigate();

    const handleLogScandela = () => {
        navigate('/scandela');
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
            <PortalLinkContainer top={'150px'} left={'400px'} img={TicketsImgBg}>
                <TicketsImgBg></TicketsImgBg>
                <PortalTitle>Tickets</PortalTitle>
            </PortalLinkContainer>
            <PortalLinkContainer top={'150px'} left={'700px'} img={ScandelaImgBg} onClick={handleLogScandela}>
                <ScandelaImgBg></ScandelaImgBg>
                <PortalTitle>Scandela</PortalTitle>
            </PortalLinkContainer>
            <PortalLinkContainer top={'150px'} left={'1000px'} img={FAQImgBg}>
                <FAQImgBg></FAQImgBg>
                <PortalTitle>FAQ</PortalTitle>
            </PortalLinkContainer>
            <PortalLinkContainer top={'400px'} left={'400px'} img={AdminImgBg}>
                <AdminImgBg></AdminImgBg>
                <PortalTitle>Admin</PortalTitle>
            </PortalLinkContainer>
            <PortalLinkContainer top={'400px'} left={'700px'} img={PremiumImgBg}>
                <PremiumImgBg></PremiumImgBg>
                <PortalTitle>Premium</PortalTitle>
            </PortalLinkContainer>
            <PortalLinkContainer top={'400px'} left={'1000px'} img={ProfilImgBg}>
                <ProfilImgBg></ProfilImgBg>
                <PortalTitle>Profil</PortalTitle>
            </PortalLinkContainer>
            <LogoutButtonContainer onClick={handleLogout}>
                Déconnection
            </LogoutButtonContainer>
        </div>
    );
};

export default LandingPageComponent;