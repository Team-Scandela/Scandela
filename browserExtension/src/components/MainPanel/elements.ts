import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import {
    AiFillCloseCircle,
    AiOutlineWarning,
    AiOutlineSend,
} from 'react-icons/ai';

interface ShowDarkProps {
    show: boolean;
    isDark: boolean;
}

interface DarkProps {
    isDark: boolean;
}

interface DarkClickProps {
    isDark: boolean;
    onClick: () => void;
}

/** Container for the background of the DuringYourAbsence **/
export const PannelContainer = styled.div<ShowDarkProps>`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: ${(props) => (props.show ? '800px' : '0px')};
    height: ${(props) => (props.show ? '500px' : '0px')};
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : White + 'FF'};
    border-radius: 30px;
    transition:
        transform 0.2s ease-in-out,
        width 0.5s ease-in-out,
        height 1s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    transform-origin: center;
    transform: scaleX(${(props) => (props.show ? 1 : 0)})
        scaleY(${(props) => (props.show ? 1 : 0)});
    overflow: hidden;
`;

export const PannelText = styled.div<DarkProps>`
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 40px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 300;
`;

export const CloseIcon = styled(AiFillCloseCircle)<DarkProps>`
    position: absolute;
    right: 30px;
    top: 40px;
    font-size: 40px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    opacity: 1;
    transition: opacity 0.1s;
    overflow: hidden;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

export const ListDetailContainer = styled.div<DarkProps>`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 30px;
    width: 680px;
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
    left: 5%;
    width: 90%;
    height: 100px;
    top: 10%;
`;

export const WarningIcon = styled(AiOutlineWarning)`
    position: absolute;
    left: 0px;
    top: 15px;
    font-size: 70px;
    color: Red;
`;

export const ArrowIcon = styled(AiOutlineSend)<DarkClickProps>`
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

export const EventText = styled.div<DarkProps>`
    position: absolute;
    top: 5px;
    left: 0px;
    font-size: 30px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : White)};
    font-weight: 550;
`;
