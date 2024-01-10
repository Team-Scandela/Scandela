import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkGrey, DarkYellow } from '../../../colors';
import { IoIosReturnLeft } from "react-icons/io";

export const PremiumPageContainer = styled.div`
    position: absolute;
    display: flex;
    width: 400px;
    height: 500px;
    top: 18%;
    left: 36%;
    border-radius: 10px;
    background-color: ${DarkGrey};
`;

export const MainTitle = styled.div`
    position: absolute;
    display: flex;
    top: ${(props) => props.top};
    left: 7%;
    font-size: 17px;
    user-select: none;
    color: ${DarkYellow};
    font-weight: 1000;
`;

export const MainText = styled.div`
    position: absolute;
    display: flex;
    top: ${(props) => props.top};
    left: 7%;
    font-size: 15px;
    user-select: none;
    color: ${DarkYellow};
    font-weight: 700;
    max-width: 350px;
`;

/** Style for the premium on/off button **/
export const PremiumButtonOnOffStyle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    top: 83%;
    left: 27%;
    user-select: none;
    opacity: 0.8;
    background-color: ${Yellow + 'CC'};
    color: ${Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

/** Style for the premium button on/off text **/
export const PremiumButtonOnOffText = styled.div`
    position: relative;
    font-size: 10px;
    user-select: none;
    color: ${Black};
    font-weight: 1000;
`;

export const ReturnButtonContainer = styled(IoIosReturnLeft)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    top: 88%;
    left: 46%;
    border-radius: 10px;
    background-color: ${Yellow};
    opacity: 0.8;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;