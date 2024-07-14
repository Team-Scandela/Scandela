import styled from 'styled-components';
import {
    Yellow,
    Black,
    DarkGrey,
    DarkYellow,
    White,
    Grey,
    LightDarkGrey,
} from '../../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';

export const TicketsContainer = styled.div`
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

export const TicketsRectangle = styled.div`
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

export const TicketsTitle = styled.div`
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

export const DropdownContainer = styled.div`
    position: absolute;
    top: 80px;
    left: 2.5%;
    width: 95%;
    height: 40px;
    background-color: ${DarkGrey};
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
    color: ${Yellow};

    transition: all ease-in 0.2s;

    &:hover {
        background-color: ${LightDarkGrey};
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
        background-color: ${Grey};
    }
`;

export const TicketTitleInput = styled.input`
    position: absolute;
    top: 130px;
    left: 2.5%;
    width: 95%;
    padding: 10px;
    border-radius: 5px;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    font-family: 'SyneRegular';
    border: none;
    background-color: ${DarkGrey};
`;

export const TicketDescriptionInput = styled.textarea`
    position: absolute;
    top: 180px;
    left: 2.5%;
    width: 95%;
    height: 250px;
    padding: 10px;
    border-radius: 5px;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    resize: none;
    font-family: 'SyneRegular';
    border: none;
    background-color: ${DarkGrey};
`;

export const SendButton = styled.div`
    position: absolute;
    bottom: 2.5%;
    right: 2.5%;
    width: 100px;
    height: 40px;
    background-color: ${Yellow};
    border-radius: 5px;
    color: ${Black};
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    user-select: none;
    transition: all ease-in 0.2s;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${DarkYellow};
        color: ${Black};
    }

    &:active {
        background-color: ${Grey};
        color: ${Black};
    }
`;
