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
import { FaEdit, FaCheck } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { MdOutlineUpgrade } from 'react-icons/md';

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

    @media (max-width: 1200px) {
        width: 80%;
        height: 60%;
    }

    @media (max-width: 768px) {
        width: 90%;
        height: 70%;
    }

    @media (max-width: 480px) {
        width: 95%;
        height: 80%;
    }
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
    top: 0;
    left: 0;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
        padding: 5px;
    }
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

    @media (max-width: 1200px) {
        width: 45%;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        top: 10%;
        left: 0;
        transform: none;
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

    @media (max-width: 768px) {
        font-size: 30px;
        width: 30px;
        height: 30px;
        right: 5px;
        top: 5px;
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

    @media (max-width: 768px) {
        font-size: 30px;
        top: 5%;
        left: 5%;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        top: 2.5%;
        left: 10%;
    }
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

    @media (max-width: 768px) {
        font-size: 16px;
        top: ${(props) => props.top.replace('px', '') * 0.8 + 'px'};
        left: ${(props) => props.left.replace('px', '') * 0.8 + 'px'};
    }
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

    @media (max-width: 768px) {
        padding: 3px 4px;
        margin-left: 8px;
    }

    @media (max-width: 480px) {
        padding: 2px 3px;
        margin-left: 4px;
    }
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

    @media (max-width: 768px) {
        font-size: 24px;
        top: 2%;
        left: 2%;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        top: 1.5%;
        left: 1.5%;
    }
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

    @media (max-width: 768px) {
        top: 10%;
        left: 2%;
        width: 90%;
        height: 70%;
        padding: 5px;
    }

    @media (max-width: 480px) {
        top: 5%;
        left: 1%;
        width: 95%;
        height: 60%;
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

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
        padding: 8px;
    }

    @media (max-width: 480px) {
        width: 95%;
        height: auto;
        padding: 6px;
    }
`;

export const UserCardTitle = styled.div`
    position: absolute;
    user-select: none;
    top: 5px;
    font-weight: bold;
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 16px;
        top: 3px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        top: 2px;
    }
`;

export const UserCardRights = styled.div`
    position: absolute;
    user-select: none;
    top: 30px;
    font-size: 15px;

    @media (max-width: 768px) {
        font-size: 12px;
        top: 20px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        top: 15px;
    }
`;

export const UserCardEmail = styled.div`
    position: absolute;
    user-select: none;
    top: 55px;
    font-size: 15px;

    @media (max-width: 768px) {
        font-size: 12px;
        top: 40px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        top: 30px;
    }
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

    @media (max-width: 768px) {
        font-size: 25px;
        right: 5px;
        top: 3px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        right: 3px;
        top: 2px;
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

    @media (max-width: 768px) {
        font-size: 25px;
        right: 5px;
        top: 30px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        right: 3px;
        top: 20px;
    }
`;
