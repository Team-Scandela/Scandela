import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import { GiSandsOfTime } from 'react-icons/gi';
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

    @media (max-width: 768px) {
        left: 300px;
    }

    @media (max-width: 576px) {
        left: 200px;
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
    top: 20px;
    left: 20px;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 550;
    user-select: none;

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
    left: 30px;
    width: 600px;
    height: 380px;
    top: 20%;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'FF' : Black + 'FF'};
    border-radius: 30px;
    padding: 20px;
    gap: 10px;

    @media (max-width: 992px) {
        width: 500px;
        height: 300px;
        left: 20px;
    }

    @media (max-width: 768px) {
        width: 400px;
        height: 250px;
        left: 15px;
    }

    @media (max-width: 576px) {
        width: 200px;
        height: 150px;
        left: 10px;
    }
`;

export const EventContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    background-color: ${(props) => (props.isDark ? Black : White)};

    @media (max-width: 992px) {
        height: 80px;
    }

    @media (max-width: 768px) {
        height: 60px;
    }

    @media (max-width: 576px) {
        height: 50px;
    }
`;

export const EventDate = styled.div`
    position: absolute;
    top: 65px;
    left: 365px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 20px;

    @media (max-width: 992px) {
        top: 50px;
        left: 280px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        top: 40px;
        left: 220px;
        font-size: 14px;
    }

    @media (max-width: 576px) {
        top: 30px;
        left: 160px;
        font-size: 12px;
    }
`;

export const EventDescription = styled.div`
    position: absolute;
    top: 40px;
    left: 10px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 20px;

    @media (max-width: 992px) {
        top: 30px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        top: 25px;
        font-size: 14px;
    }

    @media (max-width: 576px) {
        top: 20px;
        font-size: 12px;
    }
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

    @media (max-width: 992px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 576px) {
        font-size: 16px;
    }
`;

export const EventLocation = styled.div`
    position: absolute;
    top: 65px;
    left: 10px;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 20px;

    @media (max-width: 992px) {
        top: 50px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        top: 40px;
        font-size: 14px;
    }

    @media (max-width: 576px) {
        top: 30px;
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
