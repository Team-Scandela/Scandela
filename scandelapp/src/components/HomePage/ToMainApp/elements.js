import styled from 'styled-components';
import { Yellow, Black, DarkGrey } from '../../../colors';
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
    height: 75%;
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
    height: 75%;
    top: 0%;
    left: 0%;
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
    width: 20%;
    height: 10%;
    top: 80%;
    right: 0%;
    transition: background-color 0.2s;
    font-weight: bold;
    user-select: none;

    &:hover {
        cursor: pointer;
        background-color: ${DarkGrey};
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