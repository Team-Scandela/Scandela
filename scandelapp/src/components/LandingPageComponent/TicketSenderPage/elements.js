import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../../colors';
import { IoIosReturnLeft } from 'react-icons/io';

export const TicketSenderContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 900px;
    height: 500px;
    top: 25%;
    left: 25%;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : White + 'FF'};
    border-radius: 30px;
    transition:
        transform 0.2s ease-in-out,
        width 0.5s ease-in-out,
        height 1s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    transform-origin: center;
    overflow: hidden;
`;

export const Title = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 30px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    user-select: none;
`;

export const DropdownContainer = styled.div`
    position: absolute;
    top: 100px;
    left: 30px;
    width: 80%;
    height: 40px;
    background-color: ${(props) => (props.isDark ? White : Black)};
    border: 1px solid ${Grey};
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    padding: 0 0 0 10px;

    display: flex;
    align-items: center;
    color: ${(props) => (props.isDark ? Yellow : Black)};
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
    top: 160px;
    left: 30px;
    width: 80%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${Grey};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-size: 16px;
    font-weight: 500;
`;

export const TicketDescriptionInput = styled.textarea`
    position: absolute;
    top: 220px;
    left: 30px;
    width: 80%;
    height: 250px;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${Grey};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-size: 16px;
    font-weight: 500;
    resize: none;
`;

export const SendButton = styled.div`
    position: absolute;
    bottom: 60px;
    right: 30px;
    width: 100px;
    height: 40px;
    transform: translateY(100%);
    background-color: ${(props) => (props.isDark ? Yellow : Black)};
    border-radius: 5px;
    color: ${(props) => (props.isDark ? Black : White)};
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    user-select: none;

    &:hover {
        opacity: 0.8;
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
