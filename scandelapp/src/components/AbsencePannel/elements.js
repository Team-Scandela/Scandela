import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import {
    AiFillCloseCircle,
    AiOutlineWarning,
    AiOutlineSend,
} from 'react-icons/ai';

/** Container for the absence pannel button **/
export const AbsencePannelButtonContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 40px;
    top: 25px;
    left: 500px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Yellow
                : Black
            : props.isDark
              ? Black + 'CC'
              : White + 'CC'};
    color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Black
                : White
            : props.isDark
              ? Yellow
              : Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

/** Container for the background of the DuringYourAbsence **/
export const PannelContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 800px;
    height: 500px;
    top: 20%;
    left: 25%;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : White + 'FF'};
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const PannelText = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 550;
    user-select: none;
`;

export const CloseIcon = styled(AiFillCloseCircle)`
    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const ListDetailContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 30px;
    width: 600px;
    height: 380px;
    top: 20%;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'FF' : Black + 'FF'};
    border-radius: 30px;
`;

export const EventContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 3%;
    width: 90%;
    height: 80px;
    top: ${(props) => props.top};
`;

export const WarningIcon = styled(AiOutlineWarning)`
    position: absolute;
    left: 0px;
    top: 15px;
    font-size: 70px;
    color: Red;
`;

export const ArrowIcon = styled(AiOutlineSend)`
    position: absolute;
    right: 0px;
    top: 15px;
    font-size: 60px;
    color: ${(props) => (props.isDark ? Black : White)};
    opacity: 1;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

export const EventTextContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 15%;
    width: 70%;
    height: 80px;
    top: 10%;
`;

export const EventText = styled.div`
    position: absolute;
    top: 5px;
    left: 0px;
    font-size: 30px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : White)};
    font-weight: 550;
`;

export const IndicatorsImage = styled.img`
    position: absolute;
    right: 50px;
    top: 125px;
    width: 100px;
    height: auto;
`;
