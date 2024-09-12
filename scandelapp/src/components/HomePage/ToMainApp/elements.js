import styled from 'styled-components';
import { Yellow, Black, DarkGrey, DarkYellow } from '../../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';

export const ToMainAppContainer = styled.div`
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
        top: 60%;
    }
`;

export const ToMainAppRectangle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    background-color: ${Black};
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    flex-direction: column;
    gap: 10px;
`;

export const ToMainAppPart = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${DarkGrey};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    width: ${(props) => props.width};
    height: 80%;
    left: ${(props) => props.left};
    top: 15%;

    @media (max-width: 1200px) {
        font-size: 25px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

export const ToMainAppTextContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${DarkGrey};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    width: ${(props) => props.width};
    height: 80%;
    left: ${(props) => props.left};
    top: 15%;

    @media (max-width: 1200px) {
        font-size: 25px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

export const ToMainAppButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    width: 95%;
    height: 10%;
    top: 87.5%;
    left: 50%;
    transition: all ease-in 0.2s;
    font-weight: bold;
    user-select: none;
    font-family: 'SyneRegular';
    transform: translate(-50%, 0%);

    &:hover {
        cursor: pointer;
        background-color: ${DarkYellow};
        color: ${Black};
    }

    &:active {
        background-color: ${DarkGrey};
        color: ${Black};
    }

    @media (max-width: 1200px) {
        height: 12%;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        height: 15%;
        font-size: 16px;
    }

    @media (max-width: 480px) {
        height: 18%;
        font-size: 14px;
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

    @media (max-width: 1200px) {
        font-size: 35px;
    }

    @media (max-width: 768px) {
        font-size: 30px;
    }

    @media (max-width: 480px) {
        font-size: 25px;
    }
`;

export const ToMainAppText = styled.div`
    position: absolute;
    display: flex;
    color: ${Yellow};
    font-size: 18px;
    padding: 10px;
    width: 90%;
    height: 80%;
    top: 5%;
    left: 5%;
    font-family: 'SyneRegular';
    text-align: justify;
    hyphens: auto;

    @media (max-width: 1200px) {
        font-size: 16px;
    }

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

export const ToMainAppImage = styled.img`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 95%;
    top: 50%;
    left: 50%;
    user-select: none;
    transform: translate(-50%, -50%);

    @media (max-width: 1200px) {
        width: 90%;
        height: 90%;
    }

    @media (max-width: 768px) {
        width: 85%;
        height: 85%;
    }

    @media (max-width: 480px) {
        width: 80%;
        height: 80%;
    }
`;

export const ToMainAppTitle = styled.div`
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

    @media (max-width: 1200px) {
        font-size: 35px;
        top: 10%;
    }

    @media (max-width: 768px) {
        font-size: 30px;
        top: 12%;
    }

    @media (max-width: 480px) {
        font-size: 25px;
        top: 15%;
    }
`;
