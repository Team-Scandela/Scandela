import styled from 'styled-components';
import { Yellow, Black, DarkGrey, DarkYellow, White, Grey, LightDarkGrey } from '../../../colors';
import {
    AiFillCloseCircle,
} from 'react-icons/ai';
import { FaEdit, FaCheck } from 'react-icons/fa';

export const ProfilContainer = styled.div`
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

export const ProfilRectangle = styled.div`
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
    gap : 10px;
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

export const ProfilTitle = styled.div`
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
    transform : translate(0%, -50%);
`;


export const ProfileField = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    user-select: none;
    color: ${DarkYellow};
    font-size: 20px;
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