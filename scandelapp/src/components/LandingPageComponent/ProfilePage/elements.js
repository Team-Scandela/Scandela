import styled from 'styled-components';
import {
    Yellow,
    Black,
    White,
    Grey,
    DarkGrey,
    DarkYellow,
} from '../../../colors';
import { IoIosReturnLeft } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

export const ProfilePageContainer = styled.div`
    position: absolute;
    display: flex;
    width: 400px;
    height: 500px;
    top: 18%;
    left: 36%;
    border-radius: 10px;
    background-color: ${DarkGrey};
`;

export const MainTitle = styled.div`
    position: absolute;
    display: flex;
    top: 4%;
    left: 35%;
    font-size: 22px;
    user-select: none;
    color: ${DarkYellow};
    font-weight: 1000;
`;

export const ProfileField = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    user-select: none;
    color: ${DarkYellow};
    font-weight: 700;
    font-size: 15px;
    margin-left: 15px;
`;

export const EditButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${DarkYellow};
    color: ${Black};
    border: none;
    border-radius: 5px;
    padding: 4px 5px;
    margin-left: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
`;

export const EditIcon = styled(FaEdit)`
    margin-left: 2px;
`;

export const ValidateIcon = styled(FaCheck)``;

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
