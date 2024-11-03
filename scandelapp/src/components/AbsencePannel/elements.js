import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai';

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
    width: 750px;
    height: 500px;
    top: 20%;
    left: 25%;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : White + 'FF'};
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const PannelText = styled.div`
    position: absolute;
    top: 3%;
    left: 3%;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 550;
    user-select: none;
    font-family: 'SyneRegular';
`;

export const CloseIcon = styled(AiFillCloseCircle)`
    display: flex;
    position: absolute;
    right: 3%;
    top: 3%;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;

export const ListDetailContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    bottom: 3%;
    left: 3%;
    width: 600px;
    height: 400px;
    overflow-y: auto;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'FF' : Black + 'FF'};
    border-radius: 10px;

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
        background-color: ${Black};
        border-radius: 5px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 2px;
    }
`;

export const EventContainer = styled.div`
    display: flex;
    position: absolute;
    width: 97%;
    height: 150px;
    top: ${(props) => props.y}px;
    border-radius: 10px;
    background-color: ${(props) => (props.isDark ? Black : White)};
    overflow: hidden;
    margin: 8px;
    border: 2px solid ${Black};
`;

export const TextContainer = styled.div`
    display: flex;
    position: relative;
    top: 10px;
    flex-direction: column;
    padding-left: 3%;
    gap: 5px;
    max-width: 94%;
`;

export const EventTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};
`;

export const EventLocation = styled.div`
    font-size: 18px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};
`;

export const EventDescription = styled.div`
    font-size: 17px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};
`;

export const EventDate = styled.div`
    font-size: 16px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};
`;

/**  Time Icon**/
export const TimeIcon = styled(GiSandsOfTime)`
    display: flex;
    position: absolute;
    align-items: center;
    left: 31%;
    top: 24%;
    color: ${(props) => (props.isDark ? Black : Yellow)};
`;

export const NoEventText = styled.div`
    display: flex;
    position: absolute;
    top: 80%;
    left: 25%;
    font-size: 20px;
    font-weight: 500;
    user-select: none;
    font-family: 'SyneRegular';
    width: 50%;
    text-align: center;
    color: ${(props) => (props.isDark ? Black : Yellow)};
`;
