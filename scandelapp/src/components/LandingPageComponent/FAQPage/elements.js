import styled from 'styled-components';
import {
    Yellow,
    Black,
    White,
    Grey,
    DarkGrey,
    DarkYellow,
} from '../../../colors';
import { IoIosReturnLeft } from 'react-icons/io';

export const FAQPageContainer = styled.div`
    position: absolute;
    display: flex;
    width: 65%;
    height: 67%;
    top: 18%;
    left: 17%;
    border-radius: 10px;
    background-color: ${DarkGrey};
`;

export const FAQLeftContainer = styled.div`
    position: absolute;
    flex-direction: column;
    display: flex;
    width: 48.5%;
    height: 96%;
    top: 2%;
    left: 1%;
    border-radius: 10px;
    background-color: ${Grey};
    overflow-y: scroll;
`;

export const FAQRightContainer = styled.div`
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 48.5%;
    height: 96%;
    top: 2%;
    left: 50.5%;
    border-radius: 10px;
    background-color: ${Black};
    color: ${DarkYellow};
`;

export const QuestionTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 455px;
    height: 65px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${Black};
    color: ${DarkYellow};
    margin: 6px;
    transition: all 0.1s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: ${DarkYellow};
        color: ${Black};
    }
`;

export const TitleText = styled.div`
    position: absolute;
    display: flex;
    left: 2%;
    font-size: 13px;
    user-select: none;
    font-weight: 700;
    margin-right: 20px;
`;

export const DescriptionTitleText = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 20px;
    font-size: 17px;
    user-select: none;
    font-weight: 700;
    margin-left: 30px;
    margin-right: 30px;
`;

export const DescriptionText = styled.div`
    left: 2%;
    font-size: 13px;
    user-select: none;
    font-weight: 700;
    margin-left: 20px;
    margin-right: 20px;
    line-height: 20px;
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

    &:active {
        opacity: 0.5;
    }
`;
