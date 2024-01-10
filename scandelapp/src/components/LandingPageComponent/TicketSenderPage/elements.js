import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../../colors';
import { IoIosReturnLeft } from "react-icons/io";

export const Title = styled.div`
    position: absolute;
    top: 180px;
    left: 300px;
    font-size: 30px;
    font-weight: 600;
    color: ${Yellow};
    user-select: none;
`;

export const DropdownContainer = styled.div`
    position: absolute;
    top: 240px;
    left: 300px;
    width: 60%;
    height: 40px;
    background-color: ${White};
    border: 1px solid ${Grey};
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    padding: 0 0 0 10px;

    display: flex;
    align-items: center;
    color: ${Yellow};
`;

export const DropdownItem = styled.div`
    padding: 10px;
    margin-left: 10px;
    min-width: 10%;
    text-align: center;
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: ${Grey};
    }
`;

export const TicketTitleInput = styled.input`
    position: absolute;
    top: 290px;
    left: 300px;
    width: 60%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${Grey};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
`;

export const TicketDescriptionInput = styled.textarea`
    position: absolute;
    top: 350px;
    left: 300px;
    width: 60%;
    height: 250px;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${Grey};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${Yellow};
    font-size: 16px;
    font-weight: 500;
    resize: none;
`;

export const SendButton = styled.div`
    position: absolute;
    top: 82.5%;
    left: 56%;
    width: 100px;
    height: 40px;
    transform: translateY(100%);
    background-color: ${Yellow};
    border-radius: 10px;
    color: ${Black};
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    user-select: none;
    opacity: 0.8;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    &:active {
        opacity: 0.5;
    }
`;

export const ReturnButtonContainer = styled(IoIosReturnLeft)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    top: 88%;
    left: 46%;
    border-radius: 10px;
    background-color: ${Yellow};
    opacity: 0.8;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    &:active {
        opacity: 0.5;
    }
`;