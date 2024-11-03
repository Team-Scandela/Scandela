import styled from 'styled-components';

// COLOR

import {
    Black,
    DarkGrey,
    Yellow,
    White,
    Grey,
    DarkYellow,
    LightDarkGrey,
    Red,
    Green,
    LightGreen,
} from '../../../../colors';

// Icone
import { AiFillCloseCircle } from 'react-icons/ai';
import { GoLightBulb as Bulb } from 'react-icons/go';
import { RiMapPin2Line } from 'react-icons/ri';
import { GiElectric } from 'react-icons/gi';
import { IoMdSend, IoMdCheckmark } from 'react-icons/io';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { MdElectricalServices } from 'react-icons/md';

// STYLE

export const BulbCardContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: ${Black + 'CC'};
    z-index: 999;
    user-select: auto;
    font-family: 'SyneRegular';
`;

export const BulbCardContent = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 50%;
    background-color: ${Black};
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 2px solid ${Yellow};
    z-index: 1000;
`;

export const BulbCardTitle = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    color: ${Yellow};
    font-size: 30px;
    top: 10px;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);
    font-family: 'SyneRegular';
`;

export const BulbCardName = styled.div`
    position: absolute;
    top: 25%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;

export const BulbCardIntensity = styled.div`
    position: absolute;
    top: 50%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;
export const BulbCardConsommation = styled.div`
    position: absolute;
    top: 75%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;

// INPUT

export const BulbCardInputName = styled.input`
    position: absolute;
    width: 80%;
    height: 40px;
    top: 25%;
    left: 10%;
    border-radius: 5px;
    background-color: ${DarkGrey};
    color: ${({ isFailed }) => (isFailed ? Red : White)};
    user-select: none;
    font-size: 20px;
    padding-left: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

// ICON

export const BulbCardClose = styled(AiFillCloseCircle)`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    color: ${Yellow};
    opacity: 1;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const BulbCardModification = styled(FaPen)`
    position: absolute;
    top: 18px;
    right: 100px;
    font-size: 20px;
    color: ${Yellow};
    opacity: 1;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const BulbCardSendIcon = styled(IoMdSend)`
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

export const BulbCardValidateIcon = styled(IoMdCheckmark)`
    position: absolute;
    right: 22%;
    top: 5%;
    font-size: 30px;
    color: ${Green};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const BulbCardBulbIcon = styled(Bulb)`
    position: absolute;
    top: 25%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;

export const BulbCardTrashIcon = styled(FaTrashAlt)`
    position: absolute;
    right: 1%;
    top: 23%;
    font-size: 20px;
    color: ${Red};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const BulbCardConsoIcon = styled(MdElectricalServices)`
    position: absolute;
    top: 50%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;

export const BulbCardIntensityIcon = styled(GiElectric)`
    position: absolute;
    top: 75%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;
