import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai';

/** Container for the absence panel button **/
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

    @media (max-width: 992px) {
        left: 400px;
    }

    @media (max-width: 768px) {
        left: 250px;
        width: 40px;
        height: 35px;
    }

    @media (max-width: 576px) {
        left: 150px;
        width: 35px;
        height: 30px;
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

    @media (max-width: 992px) {
        width: 600px;
        height: 400px;
        left: 20%;
    }

    @media (max-width: 768px) {
        width: 500px;
        height: 300px;
        left: 15%;
    }

    @media (max-width: 576px) {
        width: 300px;
        height: 200px;
        left: 10%;
    }
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

    @media (max-width: 992px) {
        font-size: 35px;
        top: 5%;
    }

    @media (max-width: 768px) {
        font-size: 30px;
        top: 7%;
    }

    @media (max-width: 576px) {
        font-size: 25px;
        top: 10%;
    }
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

    @media (max-width: 992px) {
        font-size: 30px;
    }

    @media (max-width: 768px) {
        font-size: 25px;
    }

    @media (max-width: 576px) {
        font-size: 20px;
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
        background-color: ${Black};
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${Grey};
        border-radius: 7px;

        &:hover {
            background-color: ${White};
        }
    }

    ::-webkit-scrollbar-track {
        width: 10px;
        background-color: ${Black};
        border-radius: 5px;
    }

    @media (max-width: 992px) {
        width: 500px;
        height: 350px;
        left: 2%;
    }

    @media (max-width: 768px) {
        width: 400px;
        height: 300px;
        left: 1%;
    }

    @media (max-width: 576px) {
        width: 280px;
        height: 250px;
        left: 0%;
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

    @media (max-width: 768px) {
        height: 130px;
    }

    @media (max-width: 576px) {
        height: 100px;
    }
`;

export const TextContainer = styled.div`
    display: flex;
    position: relative;
    top: 10px;
    flex-direction: column;
    padding-left: 3%;
    gap: 5px;
    max-width: 94%;

    @media (max-width: 768px) {
        padding-left: 2%;
    }

    @media (max-width: 576px) {
        padding-left: 1%;
        gap: 3px;
    }
`;

export const EventTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 576px) {
        font-size: 16px;
    }
`;

export const EventLocation = styled.div`
    font-size: 18px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 576px) {
        font-size: 14px;
    }
`;

export const EventDescription = styled.div`
    font-size: 17px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};

    @media (max-width: 768px) {
        font-size: 15px;
    }

    @media (max-width: 576px) {
        font-size: 13px;
    }
`;

export const EventDate = styled.div`
    font-size: 16px;
    font-weight: 500;
    user-select: none;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
    color: ${(props) => (props.isDark ? Black : Grey)};

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 576px) {
        font-size: 12px;
    }
`;

/** Time Icon **/
export const TimeIcon = styled(GiSandsOfTime)`
    display: flex;
    position: relative;
    align-items: center;
    left: 31%;
    top: 24%;
    color: ${(props) => (props.isDark ? Black : Yellow)};

    @media (max-width: 992px) {
        left: 25%;
        top: 20%;
    }

    @media (max-width: 768px) {
        left: 20%;
        top: 18%;
    }

    @media (max-width: 576px) {
        left: 15%;
        top: 15%;
    }
`;
