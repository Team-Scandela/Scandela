import styled from 'styled-components';
import {
    Yellow,
    Black,
    DarkGrey,
    DarkYellow,
    White,
    Grey,
    LightDarkGrey,
    Red,
} from '../../../colors';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { MdOutlineUpgrade } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';
import { IoPersonAdd } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';

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
    flex-direction: line;
    gap: 10px;
`;

export const ProfilPart = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    background-color: ${DarkGrey};
    border-radius: 10px;
    width: 47.5%;
    height: 70%;
    top: 20%;
    left: ${(props) => props.left};
    flex-direction: column;
    transform: translate(-50%, 0%);
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
    transform: translate(0%, -50%);
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

// RIGHT PART

export const SuperUserTitle = styled.div`
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    user-select: none;
    color: ${DarkYellow};
    font-size: 30px;
    font-family: 'SyneRegular';
`;

export const UsersList = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 15%;
    left: 2.5%;
    width: 95%;
    height: 80%;
    overflow-y: auto;
    gap: 10px;
    background-color: ${LightDarkGrey};
    border-radius: 10px;
    padding: 10px;

    &::-webkit-scrollbar {
        width: 10px;
    }
`;

export const UserCard = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    background-color: ${Grey};
    color: ${White};
    transition: background-color 0.2s ease-in-out;
    width: 95%;
    height: 100px;
    transform: translate(-50%, 0%);
    left: 50%;
    color: ${Black};
    user-select: none;
    transition: background-color 0.2s ease-in-out;
`;

export const UserCardTitle = styled.div`
    position: absolute;
    user-select: none;
    top: 5px;
    font-weight: bold;
    font-size: 20px;
`;

export const UserCardRights = styled.div`
    position: absolute;
    user-select: none;
    top: 30px;
    font-size: 15px;
`;

export const UserCardEmail = styled.div`
    position: absolute;
    user-select: none;
    top: 55px;
    font-size: 15px;
`;

export const UserCardDelete = styled(AiOutlineUserDelete)`
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 30px;
    color: ${DarkYellow};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const UserCardUpgrade = styled(MdOutlineUpgrade)`
    position: absolute;
    right: 10px;
    top: 40px;
    font-size: 30px;
    color: ${DarkYellow};
    opacity: 1;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const LogoutButton = styled(BiExit)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    bottom: 10px;
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: ${Black};
    opacity: 1;
    background-color: ${Yellow};
    border-radius: 10px;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const ButtonAddAdmin = styled(IoPersonAdd)`
    position: absolute;
    top: 2.5%;
    right: 2.5%;
    user-select: none;
    color: ${DarkYellow};
    font-size: 30px;
    font-family: 'SyneRegular';
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const InputName = styled.input`
    position: absolute;
    width: 80%;
    height: 40px;
    top: 25%;
    left: 10%;
    border: 1px solid ${({ isError }) => (isError ? 'red' : 'black')};
    border-radius: 5px;
    background-color: ${DarkGrey};
    user-select: none;
    font-size: 20px;
    padding-left: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
        border-color: ${({ isError }) => (isError ? 'darkred' : '#blue')};
    }
`;

export const ButtonSendAddAdmin = styled(IoMdSend)`
    position: absolute;
    right: 0%;
    top: 29%;
    font-size: 20px;
    color: ${Yellow};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
