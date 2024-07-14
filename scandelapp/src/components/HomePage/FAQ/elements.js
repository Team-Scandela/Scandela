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

export const FAQContainer = styled.div`
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

export const FAQRectangle = styled.div`
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

export const FAQTitle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    color: ${Yellow};
    font-size: 40px;
    top: 7.5%;
    left: 2.5%;
    user-select: none;
    font-weight: bold;
    transform: translate(0%, -50%);
    font-family: 'SyneRegular';
`;

export const FAQLeftContainer = styled.div`
    position: absolute;
    flex-direction: column;
    display: flex;
    width: 47.5%;
    height: 80%;
    top: 15%;
    left: 2.5%;
    border-radius: 10px;
    background-color: ${DarkGrey};
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 15px;
        size: 5px;
        background-color: ${Black};
        margin-right: 0px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${Grey};
        border-radius: 7px;
        margin-right: 20px;

        &:hover {
            background-color: ${White};
        }
    }

    ::-webkit-scrollbar-track {
        width: 10px;
        background-color: ${DarkGrey};
        border-radius: 0px 5px 5px 0px;
        margin-right: 5px;
    }
`;

export const FAQRightContainer = styled.div`
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 47.5%;
    height: 80%;
    top: 15%;
    left: 50.5%;
    border-radius: 10px;
    background-color: ${DarkGrey};
    color: ${DarkYellow};
`;

export const QuestionTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 410px;
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
    font-size: 14px;
    user-select: none;
    font-weight: 700;
    margin-right: 20px;
    font-family: 'SyneRegular';
`;

export const DescriptionTitleText = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 15px;
    font-size: 17px;
    user-select: none;
    font-weight: 700;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'SyneRegular';
`;

export const DescriptionText = styled.div`
    left: 2%;
    font-size: 12px;
    user-select: none;
    font-weight: 700;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
    line-height: 20px;
    font-family: 'SyneRegular';
`;
