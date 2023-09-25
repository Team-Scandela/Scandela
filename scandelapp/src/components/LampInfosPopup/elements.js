import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';

/** Container for the background of the Popup **/
export const PannelContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 670px;
    top: 25%;
    left: 40%;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : White + 'FF'};
    border-radius: 30px;
    transition:
        transform 0.2s ease-in-out,
        width 0.5s ease-in-out,
        height 1s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    transform-origin: center;
    overflow: hidden;
`;

export const PopupTextLampName = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : White)};
    font-weight: 750;
`;

export const PopupTextInfoTitle = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: 0;
    right: 0;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    font-weight: 750;
    text-align: center;
`;

export const PopupTextActionsTitle = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: 0;
    right: 0;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 750;
    text-align: center;
`;

export const PopupSubTextLampName = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: 0;
    right: 0;
    font-size: 17px;
    user-select: none;
    color: ${(props) => (props.isDark ? 'Black' : 'white')};
    font-weight: 400;
    text-align: center;
`;

export const PopupText = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: 160px;
    font-size: 17px;
    user-select: none;
    color: ${(props) => (props.isDark ? 'White' : 'white')};
    font-weight: 400;
`;

export const PopupTitle = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: 30px;
    font-size: 17px;
    user-select: none;
    color: ${(props) => (props.isDark ? 'White' : 'white')};
    font-weight: 400;
`;

export const PopupTextActions = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: 120px;
    font-size: 17px;
    user-select: none;
    color: ${(props) => (props.isDark ? 'White' : 'white')};
    font-weight: 400;
`;

export const CloseIcon = styled(AiFillCloseCircle)`
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    opacity: 1;
    transition: opacity 0.1s;
    overflow: hidden;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

export const ListDetailContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 10px;
    width: 380px;
    height: 220px;
    bottom: 10px;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'FF' : Black + 'FF'};
    border-radius: 30px;
`;

export const ButtonOptimise = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    top: 145px;
    left: 300px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : White + 'FF'};
    border-radius: 15px;
    opacity: 1;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;
