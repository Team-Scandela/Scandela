import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkYellow, DarkGrey } from '../../colors';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';

/** Button who allows to open the action history pannel */
export const ActionsHistoryButton = styled.div`
    position: absolute;
    display: flex;
    width: 70px;
    height: 40px;
    top: 150px;
    left: ${(props) => (props.show ? '195px' : '0%')};
    border-radius: 0px 8px 8px 0px;
    cursor: pointer;

    background-color: ${(props) => (props.isDark ? Black : White)};
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translate(0%, -50%)' : 'translate(0%, -50%)'};

    &:hover {
        color: ${(props) => (props.isDark ? Yellow : Black)};
    }
`;

/** Icon of the button who allows to open the action history pannel */
export const ActionHistoryButtonIcon = styled(IoCheckmarkCircleOutline)`
    position: absolute;
    display: flex;
    margin-left: 30px;
    margin-top: 5px;
`;

/** Style of the Action history pannel */
export const ActionsHistoryPannel = styled.div`
    position: absolute;
    display: flex;
    width: 210px;
    height: 440px;
    top: 350px;
    left: ${(props) => (props.show ? '0%' : '-210px')};
    border-radius: 0px 8px 8px 0px;

    background-color: ${(props) => (props.isDark ? Black : White)};
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translate(0%, -50%)' : 'translate(0%, -50%)'};
`;

/** Style of the Action title */
export const ActionsTitle = styled.div`
    position: fixed;
    top: 2px;
    left: 40px;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transform: perspective(10px) rotateX(2deg);
    letter-spacing: 2px;
    padding: 10px;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

/** Style of the Action container */
export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 10px;
    top: 50px;
    width: 190px;
    height: 380px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? DarkGrey + 'FF' : Yellow + 'FF'};
`;

/** Style of the Action template container */
export const ActionTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    width: 178px;
    height: 48px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Grey + 'FF' : Grey + 'FF')};
    margin: 6px;
    border: 2px solid ${Black};
    &:hover {
        cursor: pointer;
    }
`;

/** Style of the Action description text */
export const DescriptionText = styled.p`
    position: relative;
    top: 7px;
    left: 5px;
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
    max-width: 170px;
`;

/** Style of the Action time text */
export const TimeText = styled.p`
    position: absolute;
    top: 27px;
    left: 100px;
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 700;
`;

/** Style of the pop-up of the action selected */
export const PopUpContainer = styled.div`
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

/** Style of the pop-up close icon */
export const PopUpClose = styled(AiFillCloseCircle)`
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 50px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    z-index: 9999;
    transition: all 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        color: ${(props) => (props.isDark ? DarkGrey : DarkGrey)};
    }
`;

/** Style of the pop-up title */
export const PopUpTitle = styled.div`
    position: absolute;
    top: 25px;
    left: 80px;
    font-size: 32px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 550;
`;

/** Style of the pop-up text for the time */
export const PopUpSubtitle = styled.div`
    position: absolute;
    top: 90px;
    left: 35px;
    font-size: 25px;
    color: ${(props) => (props.isDark ? White : Black)};
    font-weight: 400;
`;

/** Style of the pop-up text for the time */
export const PopUpTime = styled.div`
    position: absolute;
    top: 140px;
    left: 35px;
    font-size: 25px;
    color: ${(props) => (props.isDark ? White : Black)};
    font-weight: 400;
`;

export const PopUpDescriptionContainer = styled.div`
    position: absolute;
    top: 200px;
    left: 35px;
    width: 740px;
    height: 70px;
    background-color: ${(props) =>
        props.isDark ? DarkGrey + 'FF' : DarkGrey + 'FF'};
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const PopUpDescriptionText = styled.p`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 25px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 400;
`;

export const PopUpIcon = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 50px;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    user-select: none;
`;

export const PopUpSolutionContainer = styled.div`
    position: absolute;
    top: 300px;
    left: 35px;
    width: 740px;
    height: 100px;
    background-color: ${(props) =>
        props.isDark ? DarkGrey + 'FF' : DarkGrey + 'FF'};
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const PopUpUnvalideButton = styled.div`
    position: absolute;
    top: 420px;
    right: 25px;
    width: 60px;
    height: 60px;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'FF' : Yellow + 'FF'};
    border-radius: 20%;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${(props) =>
            props.isDark ? DarkGrey + 'FF' : DarkGrey + 'FF'};
        cursor: pointer;
    }
`;

export const PopUpToLampButton = styled.div`
    position: absolute;
    top: 70px;
    right: 220px;
    width: 60px;
    height: 60px;
    border-radius: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color : ${Yellow};

    &:hover {
        color: ${DarkGrey};
        cursor: pointer;
    }
`;