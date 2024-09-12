import styled from 'styled-components';
import {
    Yellow,
    Black,
    DarkGrey,
    DarkYellow,
    White,
    Grey,
    LightDarkGrey,
} from '../../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';

export const PremiumContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Black};
    padding: 10px;
    border-radius: 10px;
    width: 60%;
    height: 50%;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);

    @media (max-width: 1200px) {
        width: 70%;
        height: 60%;
    }

    @media (max-width: 768px) {
        width: 80%;
        height: 70%;
    }

    @media (max-width: 480px) {
        width: 90%;
        height: 80%;
    }
`;

export const PremiumRectangle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    background-color: ${Black};
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
        padding: 5px;
    }
`;

export const CloseButton = styled(AiFillCloseCircle)`
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: ${DarkYellow};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        font-size: 30px;
        width: 30px;
        height: 30px;
        right: 5px;
        top: 5px;
    }
`;

export const PremiumTitle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    color: ${Yellow};
    font-size: 40px;
    top: 7.5%;
    left: 2.5%;
    user-select: none;
    font-family: 'SyneRegular';
    font-weight: bold;
    transform: translate(0%, -50%);

    @media (max-width: 768px) {
        font-size: 30px;
        top: 5%;
        left: 5%;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        top: 2.5%;
        left: 10%;
    }
`;

export const PremiumTextContainer = styled.div`
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    height: 65%;
    padding: 10px;
    border-radius: 5px;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    resize: none;
    border: none;
    background-color: ${DarkGrey};

    @media (max-width: 768px) {
        top: 60px;
        width: 90%;
        height: auto;
        padding: 8px;
    }

    @media (max-width: 480px) {
        top: 40px;
        width: 95%;
        height: auto;
        padding: 6px;
    }
`;

export const MainTitle = styled.div`
    font-size: 19px;
    color: ${DarkYellow};
    font-weight: 1000;
    text-align: center;
    font-family: 'SyneBold';

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

export const MainText = styled.div`
    font-size: 14px;
    color: ${DarkYellow};
    font-weight: 700;
    margin: 8px 0;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;

export const PremiumButtonOnOffStyle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    user-select: none;
    background-color: ${Yellow};
    color: ${Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
    &:active {
        opacity: 0.5;
    }

    @media (max-width: 768px) {
        width: 150px;
        height: 35px;
    }

    @media (max-width: 480px) {
        width: 120px;
        height: 30px;
    }
`;

export const PremiumButtonOnOffText = styled.div`
    font-size: 14px;
    color: ${Black};
    font-weight: 700;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;

export const SubmitButton = styled.button`
    display: flex;
    position: absolute;
    background-color: ${Yellow};
    color: ${Black};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }

    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        padding: 8px 16px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
    }
`;

export const AdminButton = styled.button`
    display: flex;
    position: absolute;
    background-color: ${Yellow};
    color: ${Black};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-left: 8%;
    bottom: 50px;
    left: 24%;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }

    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        padding: 8px 16px;
        margin-left: 5%;
        bottom: 40px;
        left: 20%;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        margin-left: 2%;
        bottom: 30px;
        left: 15%;
    }
`;
