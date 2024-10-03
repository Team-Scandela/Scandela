import styled from 'styled-components';

// COLOR

import { Black, Yellow, Red } from '../../../../colors';

// Icon import

import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GoLightBulb as Bulb } from 'react-icons/go';
import { RiMapPin2Line } from 'react-icons/ri';
import { GiStreetLight } from 'react-icons/gi';

// STYLE

export const LampCardContainer = styled.div`
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

export const LampCardContent = styled.div`
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

export const LampCardClose = styled(AiFillCloseCircle)`
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

export const LampCardTitle = styled.div`
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

export const LampCardAdressIcon = styled(RiMapPin2Line)`
    position: absolute;
    top: 20%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
`;

export const LampCardAdress = styled.div`
    position: absolute;
    top: 21.5%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    font-family: 'SyneRegular';
    width: 100%;
`;

export const LampCardGeoLoc = styled.div`
    position: absolute;
    top: 32.5%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    font-family: 'SyneRegular';
    user-select: none;
`;

export const LampCardIconLamp = styled(GiStreetLight)`
    position: absolute;
    top: 75%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;

export const LampCardIconBulb = styled(Bulb)`
    position: absolute;
    top: 57.5%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;

export const LampCardBulb = styled.div`
    position: absolute;
    top: 59%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;

export const LampCardPupBulb = styled(FaPen)`
    position: absolute;
    right: 50%;
    top: 60%;
    font-size: 20px;
    color: ${({ isBulb }) => (isBulb ? Yellow : Red)};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const LampCardHeight = styled.div`
    position: absolute;
    top: 76.5%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;

export const LampCardBulbTrash = styled(FaTrashAlt)`
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
