import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import ticketsImage from '../../assets/landing_page/tickets_bg.png'
import scandelaImage from '../../assets/landing_page/scandela_bg.png'
import faqImage from '../../assets/landing_page/faq_bg.png'
import adminImage from '../../assets/landing_page/admin_bg.png'
import premiumImage from '../../assets/landing_page/premium_bg.png'
import profilImage from '../../assets/landing_page/profil_bg.png'


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
    background: linear-gradient(to right, ${Yellow}, #FFD700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

/** Container of the logout button */
export const LogoutButtonContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 60px;
    top: 650px;
    left: 700px;
    background-color: ${Grey};
    border-radius: 10px;
    transition: opacity 0.1s;
    border: 5px solid black;

    &:hover {
        cursor: pointer;
        background-color: rgba(250,	199, 16, 0.6);
    }
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

/** Container for the left triangle */
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

/** Admin image background for the portal */
export const AdminImgBg = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${adminImage}) center/cover;
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

/** Container for the clickable portals */
export const PortalLinkContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    border-radius: 10px;
    transition: opacity 0.3s ease-in-out, background-color 0.3s ease-in-out;
    border: 5px solid black;

    &:hover {
        cursor: pointer;
        ${(props) => props.img} {
            filter: blur(0);
        }
        h2 {
            opacity: 0;
        }
    }
`;

/** Style for the portals titles */
export const PortalTitle = styled.h2`
    position: fixed;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
`;