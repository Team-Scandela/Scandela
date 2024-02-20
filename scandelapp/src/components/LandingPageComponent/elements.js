import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkGrey } from '../../colors';
import ticketsImage from '../../assets/landing_page/tickets_bg.png';
import scandelaImage from '../../assets/landing_page/scandela_bg.png';
import faqImage from '../../assets/landing_page/faq_bg.png';
import logoutImage from '../../assets/landing_page/logout_bg.png';
import premiumImage from '../../assets/landing_page/premium_bg.png';
import profilImage from '../../assets/landing_page/profil_bg.png';
import { FaLock } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa';

/** Main text on the decision page */
export const ScandelaText = styled.div`
    position: fixed;
    top: 5%;
    left: 42%;
    font-size: 45px;
    user-select: none;
    color: ${Yellow};
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transform: perspective(10px) rotateX(2deg);
    letter-spacing: 2px;
    padding: 10px;
    background: linear-gradient(to right, ${Yellow}, #ffd700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

/** Container that contain the scandela logo **/
export const LogoContainer = styled.img`
    display: flex;
    position: absolute;
    height: 12%;
    left: 34%;
    top: 3%;
    user-select: none;
`;

/** Container for the left triangle */
export const TriangleContainerLeft = styled.div`
    width: 0;
    height: 0;
    border-left: 250px solid transparent;
    border-bottom: 250px solid ${Yellow};
    transform: rotate(180deg);
`;

/** Container for the right triangle */
export const TriangleContainerRight = styled.div`
    display: flex;
    position: absolute;
    width: 0;
    height: 0;
    top: 71%;
    left: 84%;
    border-left: 250px solid transparent;
    border-bottom: 250px solid ${Yellow};
`;

/** Tickets image background for the portal */
export const TicketsImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${ticketsImage}) center/cover;
    filter: blur(2px);
    transition: filter 0.3s ease-in-out;
`;

/** Scandela image background for the portal */
export const ScandelaImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${scandelaImage}) center/cover;
    filter: blur(2px);
    transition: filter 0.3s ease-in-out;
`;

/** FAQ image background for the portal */
export const FAQImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${faqImage}) center/cover;
    filter: blur(2px);
    transition: filter 0.3s ease-in-out;
`;

/** Logout image background for the portal */
export const LogoutImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${logoutImage}) center/cover;
    filter: blur(2px);
    transition: filter 0.3s ease-in-out;
`;

/** Premium image background for the portal */
export const PremiumImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${premiumImage}) center/cover;
    filter: blur(2px);
    transition: filter 0.3s ease-in-out;
`;

/** Admin image background for the portal */
export const ProfilImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${profilImage}) center/cover;
    filter: blur(2px);
    transition: filter 0.3s ease-in-out;
`;

export const LockIcon = styled(FaLock)`
    display: flex;
    position: absolute;
    width: 50%;
    height: 50%;
    transition: all 0.1s ease-in;
    visibility: hidden;
`;

/** Container for the clickable portals */
export const PortalLinkContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    border-radius: ${(props) => props.borderRadius};
    transition:
        opacity 0.3s ease-in-out,
        background-color 0.3s ease-in-out;
    border: 5px solid black;

    &:hover {
        cursor: pointer;
        ${(props) => props.img} {
            filter: blur(0);
        }
        ${(props) => props.icon} {
            visibility: visible;
        }
        h2 {
            opacity: 0;
        }
    }
`;

/** Container for the clickable admin portal */
export const PortalLinkAdmin = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 70px;
    top: 2%;
    right: 2%;
    border-radius: 10px;
    border: 4px solid black;
    background-color: ${DarkGrey};
    color: ${Grey};
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    font-weight: 700;

    &:hover {
        cursor: pointer;
        background-color: ${Grey};
        color: ${DarkGrey};
    }
`;

/** Style for the portals titles */
export const PortalTitle = styled.h2`
    position: fixed;
    color: ${Grey};
    text-align: center;
    font-size: ${(props) => props.fontSize};
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
`;

export const PremiumPopup = styled.div`
    display: flex;
    position: absolute;
    width: 900px;
    height: 600px;
    top: 150px;
    left: 300px;
    background-color: ${Grey};
    border-radius: 20px;
`;

export const CrownIcon = styled(FaCrown)`
    display: flex;
    position: absolute;
    width: 12%;
    height: 12%;
    top: 14%;
    left: 19.5%;
    color: ${Yellow};
    transform: rotate(-40deg);
`;
