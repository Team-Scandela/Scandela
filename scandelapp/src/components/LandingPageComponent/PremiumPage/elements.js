import styled from 'styled-components';
import { IoIosReturnLeft } from 'react-icons/io';
import { DarkGrey, DarkYellow, Yellow, Black } from '../../../colors';

export const PremiumPageContainer = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    top: 17%;
    left: 38%;
    justify-content: start;
    width: 400px;
    min-height: 500px;
    border-radius: 10px;
    background-color: ${DarkGrey};
    padding: 20px;
    gap: 7px;
`;

export const MainTitle = styled.div`
    font-size: 17px;
    color: ${DarkYellow};
    font-weight: 1000;
    text-align: center;
`;

export const MainText = styled.div`
    font-size: 15px;
    color: ${DarkYellow};
    font-weight: 700;
    text-align: center;
    max-width: 350px;
    margin: 10px 0;
`;

export const PremiumButtonOnOffStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    margin-left: 25%;
    user-select: none;
    background-color: ${Yellow};
    color: ${Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;

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
`;

export const FormField = styled.input`
    width: 100%;
    margin: 14px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${Yellow};
`;

export const SubmitButton = styled.button`
    display: flex;
    position: absolute;
    background-color: ${Yellow};
    color: ${Black};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-left: 8%;
    left: 28%;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
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
`;

export const ReturnButtonContainer = styled(IoIosReturnLeft)`
    display: flex;
    position: fixed;
    width: 80px;
    height: 40px;
    top: 88%;
    left: 48%;
    border-radius: 10px;
    background-color: ${Yellow};
    opacity: 0.8;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
    &:active {
        opacity: 0.5;
    }
`;
