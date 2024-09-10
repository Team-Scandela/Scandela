import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow } from '../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';

export const LassoButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    user-select: none;
    font-size: 25px;
    opacity: 0.9;

    /* Définissez les couleurs en fonction des props isDark et isOn */
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

    position: fixed;
    bottom: 100px;
    left: 30px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

export const ValidateButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    user-select: none;
    font-size: 25px;

    background-color: ${(props) => (props.isDark ? Black : White)};
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    position: fixed;
    bottom: 160px;
    left: 30px;

    &:hover {
        cursor: pointer;
        color: ${(props) => (props.isDark ? Yellow : Black)};
    }
`;

export const CloseButton = styled(AiFillCloseCircle)`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: ${Yellow};
    font-size: 40px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 90%;
    max-width: 600px;
    height: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) => (props.isDark ? Black : White)};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    color: ${(props) => (props.isDark ? White : Black)};
    
    h2 {
        margin: 0;
    }

    p {
        margin: 10px 0 20px;
        text-align: center;
    }
`;

export const ModalHeader = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: ${(props) => (props.isDark ? Black : White)};
    border-bottom: 2px solid ${Yellow};
    font-family: 'SyneBold';
    font-size: 25px;
`;

export const ModalContent = styled.div`
    width: 80%;
    padding: 50px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => (props.isDark ? White : Black)};
    font-family: 'SyneRegular';
    font-size: 20px;
`;