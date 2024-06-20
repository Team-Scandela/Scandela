import styled from 'styled-components';
import { Yellow, Black, DarkGrey, DarkYellow } from '../../../colors';
import {
    AiFillCloseCircle,
} from 'react-icons/ai';

export const ToMainAppContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Black};
    padding: 10px;
    border-radius: 10px;
    width: 50%;
    height: 60%;
    top: 20%;
    left: 40%;
`;

export const ToMainAppRectangle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
`;

export const ToMainAppButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${Black};
    color: ${Yellow};
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    width: 20%;
    height: 10%;
    top: 87.5%;
    right: 2.5%;
    transition: all ease-in 0.2s;
    font-weight: bold;
    user-select: none;

    &:hover {
        cursor: pointer;
        background-color: ${DarkYellow};
        color: ${Black};
    }

    &:active {
        background-color: ${Black};
        color: ${Yellow};
    }
`;

export const CloseButton = styled(AiFillCloseCircle)`
    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: ${Black};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const ToMainAppText = styled.div`
    position: absolute;
    display: flex;
    justify-content: justify;
    color: ${Black};
    font-size: 25px;
    padding: 10px;
    width: 80%;
    height: 60%;
    top: 5%;
    left: 5%;
    font-family: 'SyneRegular';
    text-align: justify;
    text-justify: inter-word;
`;

export const ToMainAppImage = styled.img`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 60%;
    top: 55%;
    left: 50%;
    user-select: none;
    align-items: center;
    justify-content: center;
    transform  : translate(-50%, -50%);
`;