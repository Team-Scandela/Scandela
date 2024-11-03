import styled from 'styled-components';
import {
    Yellow,
    Black,
    DarkGrey,
    DarkYellow,
    Green,
    Red,
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
    top: 0%;
    left: 0%;
    flex-direction: column;
    gap: 10px;
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
`;

export const MainTitle = styled.div`
    font-size: 19px;
    color: ${DarkYellow};
    font-weight: 1000;
    text-align: center;
    font-family: 'SyneBold';
`;

export const MainText = styled.div`
    font-size: 14px;
    color: ${DarkYellow};
    font-weight: 700;
    margin: 8px 0;
    font-family: 'SyneRegular';
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
`;

export const PremiumButtonOnOffText = styled.div`
    font-size: 14px;
    color: ${Black};
    font-weight: 700;
    font-family: 'SyneRegular';
`;

export const DescriptionPanel = styled.button`
    display: flex;
    position: absolute;
    height: 75%;
    width: 45%;
    background-color: ${Yellow};
    color: ${Black};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    top: 20%;
    left: 25%;
    transform: translate(-50%, 0);
    opacity: 0.9;
    transition: all 0.1s ease-in-out;
    font-family: 'SyneRegular';
`;

export const DescriptionPanelText = styled.div`
    font-size: 18px;
    color: ${Black};
    margin: 20px;
    font-family: 'SyneRegular';
`;

export const BuyButton = styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 75%;
    width: 45%;
    background-color: ${Yellow};
    color: ${Black};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    top: 20%;
    left: 75%;
    transform: translate(-50%, 0);
    opacity: 0.9;
    &:hover {
        cursor: pointer;
        opacity: 1;
        height: 76%;
        width: 46%;
        top: 19.5%;
        left: 74.5%;
        border-radius: 5px;
        background-color: ${Green};
    }
    transition: all 0.1s ease-in-out;
    font-family: 'SyneRegular';
`;

export const CancelButton = styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 75%;
    width: 45%;
    background-color: ${Yellow};
    color: ${Black};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    top: 20%;
    left: 75%;
    transform: translate(-50%, 0);
    opacity: 0.9;
    &:hover {
        cursor: pointer;
        opacity: 1;
        height: 76%;
        width: 46%;
        top: 19.5%;
        left: 74.5%;
        border-radius: 5px;
        background-color: ${Red};
    }
    transition: all 0.1s ease-in-out;
    font-family: 'SyneRegular';
`;

export const ActionText = styled.div`
    font-size: 30px;
    color: ${Black};
    font-family: 'SyneBold';
`;
