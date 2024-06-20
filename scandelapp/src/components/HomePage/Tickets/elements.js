import styled from 'styled-components';
import { Yellow, Black, DarkGrey, DarkYellow, White, Grey } from '../../../colors';
import {
    AiFillCloseCircle,
} from 'react-icons/ai';

export const TicketsContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Black};
    padding: 10px;
    border-radius: 10px;
    width: 50%;
    height: 60%;
    top: 20%;
    left: 40%;
`;

export const TicketsRectangle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
`;

export const CloseButton = styled(AiFillCloseCircle)`
    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: ${Black};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const TicketsTitle = styled.div`
    position: absolute;
    display: flex;
    justify-content: justify;
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    width: 80%;
    height: 60%;
    top: 5%;
    left: 5%;
    font-family: 'SyneRegular';
    text-align: justify;
    text-justify: inter-word;
    font-weight: bold;
`;

export const DropdownContainer = styled.div`
    position: absolute;
    top: 100px;
    left: 5%;
    width: 80%;
    height: 40px;
    background-color: ${White};
    border: 1px solid ${Grey};
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    padding: 0 0 0 10px;
    font-size: 20px;
    font-family: 'SyneRegular';

    display: flex;
    align-items: center;
    color: ${Black};

    &:hover {
        background-color: ${Yellow};
    }
`;

export const DropdownItem = styled.div`
    padding: 10px;
    margin-left: 10px;
    min-width: 10%;
    text-align: center;
    user-select: none;
    cursor: pointer;
    font-size: 16px;
    font-family: 'SyneRegular';


    &:hover {
        background-color: ${White};
    }
`;

export const TicketTitleInput = styled.input`
    position: absolute;
    top: 160px;
    left: 5%;
    width: 80%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${Grey};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    font-family: 'SyneRegular';
`;

export const TicketDescriptionInput = styled.textarea`
    position: absolute;
    top: 220px;
    left: 5%;
    width: 80%;
    height: 300px;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${Grey};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    resize: none;
    font-family: 'SyneRegular';
`;

export const SendButton = styled.div`
    position: absolute;
    bottom: 2.5%;
    right: 2.5%;
    width: 100px;
    height: 40px;
    background-color: ${Black};
    border-radius: 5px;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    user-select: none;
    transition: all ease-in 0.2s;

    &:hover {
        background-color: ${DarkYellow};
        color: ${Black};
    }

    &:active {
        background-color: ${Yellow};
        color: ${Black};
    }
`;