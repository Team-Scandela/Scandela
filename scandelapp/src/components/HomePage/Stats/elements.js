import styled from 'styled-components';
import { Yellow, Black, DarkGrey, DarkYellow } from '../../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';

export const StatsContainer = styled.div`
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

export const StatsRectangle = styled.div`
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

export const StatsPart = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${DarkGrey};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    width: ${(props) => props.width};
    height: 80%;
    left: ${(props) => props.left};
    top: 15%;
`;

export const StatsTextContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${DarkGrey};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    width: ${(props) => props.width};
    height: 80%;
    left: ${(props) => props.left};
    top: 15%;
`;

export const StatsButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    width: 65%;
    height: 13%;
    top: 85%;
    left: 50%;
    transition: all ease-in 0.2s;
    font-weight: bold;
    user-select: none;
    font-family: 'SyneRegular';
    transform: translate(-50%, 0%);

    &:hover {
        cursor: pointer;
        background-color: ${DarkYellow};
        color: ${Black};
    }

    &:active {
        background-color: ${DarkGrey};
        color: ${Black};
    }
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

export const StatsText = styled.div`
    position: absolute;
    display: flex;
    color: ${Yellow};
    font-size: 18px;
    padding: 10px;
    width: 90%;
    height: 80%;
    top: 5%;
    left: 5%;
    font-family: 'SyneRegular';
    text-align: justify;
    hyphens: auto;
`;

export const StatsImage = styled.img`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 95%;
    top: 50%;
    left: 50%;
    user-select: none;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
`;

export const StatsTitle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    color: ${Yellow};
    font-size: 40px;
    top: 7.5%;
    left: 2.5%;
    user-select: none;
    font-family: 'SyneRegular';
    font-weight: bold;
    transform: translate(0%, -50%);
`;
