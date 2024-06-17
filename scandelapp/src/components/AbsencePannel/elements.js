import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import { GiSandsOfTime } from 'react-icons/gi';
import {
    AiFillCloseCircle,
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
    flex-direction: column;
    left: 30px;
    width: 600px;
    height: 380px;
    top: 20%;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'FF' : Black + 'FF'};
    border-radius: 30px;
    padding: 20px;
    gap: 10px;
`;

export const EventContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    background-color: ${(props) => (props.isDark ? Black : White)};
`;

export const EventDate = styled.div`
    position: absolute;
    top: 65px;
    left: 365px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 20px;
`;

export const EventDescription = styled.div`
    position: absolute;
    top: 40px;
    left: 10px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 20px;
`;

export const EventTitle = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 25px;
    font-weight: 500;
`;

export const EventLocation = styled.div`
    position: absolute;
    top: 65px;
    left: 10px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 20px;
`;

/**  Time Icon**/
export const TimeIcon = styled(GiSandsOfTime)`
    display: flex;
    position: relative;
    align-items: center;
    left: 31%;
    top: 24%;
    color: ${(props) => (props.isDark ? Black : Yellow)};
`;
