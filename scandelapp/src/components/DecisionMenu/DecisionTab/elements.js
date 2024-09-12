import styled from 'styled-components';
import {
    Yellow,
    Black,
    White,
    Grey,
    DarkGrey,
    LightDarkGrey,
} from '../../../colors';

export const DropdownContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;
    left: 3%;
    top: 3%;
    height: 35px;
    width: 94%;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? LightDarkGrey : LightDarkGrey)};
    color: ${(props) => (props.isDark ? Grey : Grey)};
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    font-size: 17px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
    font-family: 'SyneRegular';

    @media (max-width: 992px) {
        height: 30px;
        width: 90%;
        font-size: 15px;
        padding: 0 8px;
    }

    @media (max-width: 768px) {
        height: 25px;
        width: 85%;
        font-size: 13px;
        padding: 0 6px;
    }

    @media (max-width: 576px) {
        height: 20px;
        width: 80%;
        font-size: 11px;
        padding: 0 4px;
    }
`;

export const DropdownRoundButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-color: ${(props) => (props.isDark ? Black : Yellow)};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Black)};
        color: ${(props) => (props.isDark ? Black : Yellow)};
    }

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }

    @media (max-width: 576px) {
        width: 18px;
        height: 18px;
    }
`;


export const DropdownMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3%;
    top: 13%;
    width: 94%;
    max-height: 85%;
    background-color: ${(props) => (props.isDark ? LightDarkGrey : LightDarkGrey)};
    color: ${(props) => (props.isDark ? Black : Black)};
    padding: 10px;
    transition: all 0.3s ease-in-out;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
    overflow-y: auto;

    ${DropdownContainer}:first-child {
        border-top: 2px solid ${(props) => (props.isDark ? DarkGrey : Black)};
    }

    @media (max-width: 992px) {
        top: 15%;
        width: 90%;
    }

    @media (max-width: 768px) {
        top: 17%;
        width: 85%;
    }

    @media (max-width: 576px) {
        top: 20%;
        width: 80%;
    }
`;


export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    min-height: 35px;
    padding: 0 10px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    border-radius: 5px;
    background-color: ${(props) => (props.isDark ? Grey : Grey)};
    color: ${(props) => (props.isDark ? Black : Black)};
    font-size: 17px;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? White : White)};
    }

    @media (max-width: 992px) {
        font-size: 15px;
        padding: 0 8px;
    }

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 0 6px;
    }

    @media (max-width: 576px) {
        font-size: 11px;
        padding: 0 4px;
    }
`;


/** Container of the scrollable optimisation container */
export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3%;
    top: 13%;
    width: 94%;
    height: 77%;
    overflow-y: auto;
    border-radius: 5px;
    background-color: ${(props) => (props.isDark ? Black + 'FF' : Yellow + 'FF')};

    /* Personnalisez le style de la barre de défilement */
    ::-webkit-scrollbar {
        width: 15px;
        size: 5px;
        background-color: ${Black};
        margin-right: 0px;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${White};
        border-radius: 7px;
        margin-right: 20px;

        &:hover {
            background-color: ${Yellow};
        }
    }

    ::-webkit-scrollbar-track {
        width: 10px;
        background-color: ${Black};
        border-radius: 5px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 2px;
    }

    @media (max-width: 992px) {
        top: 15%;
        width: 90%;
        height: 75%;
    }

    @media (max-width: 768px) {
        top: 17%;
        width: 85%;
        height: 70%;
    }

    @media (max-width: 576px) {
        top: 20%;
        width: 80%;
        height: 65%;
    }
`;


export const AddToActionsListButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 30.75%;
    bottom: 2%;
    height: 30px;
    width: 210px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? Black : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? Black : Black)};
    }

    @media (max-width: 992px) {
        height: 25px;
        width: 180px;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        height: 20px;
        width: 150px;
        font-size: 12px;
    }

    @media (max-width: 576px) {
        height: 18px;
        width: 120px;
        font-size: 10px;
    }
`;


/** Container that contain the scandela logo **/
export const LogoContainer = styled.img`
    display: flex;
    position: absolute;
    height: 60%;
    left: 21%;
    top: 20%;
    user-select: none;
    opacity: 0.3;

    @media (max-width: 992px) {
        height: 50%;
        left: 18%;
        top: 25%;
    }

    @media (max-width: 768px) {
        height: 40%;
        left: 15%;
        top: 30%;
    }

    @media (max-width: 576px) {
        height: 30%;
        left: 10%;
        top: 35%;
    }
`;
