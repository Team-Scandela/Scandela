import styled from 'styled-components';
import {
    Black,
    DarkGrey,
    Yellow,
    White,
    Grey,
    DarkYellow,
    LightDarkGrey,
} from '../../../colors';
import { BiSortDown } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { GoLightBulb as Bulb } from 'react-icons/go';
import { RiMapPin2Line } from 'react-icons/ri';
import { GiStreetLight } from 'react-icons/gi';

export const LampListContainer = styled.div`
    display: flex;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 94%;
    height: 80%;
    overflow-y: auto;
    z-index: 1;
    user-select: none;
    background-color: ${Black};
    border-radius: 5px;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    gap: 10px;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${White + '99'};
        border-radius: 10px;
    }
`;

export const LampListCard = styled.div`
    display: flex;
    position: relative;
    width: calc(100% - 20px);
    background-color: ${DarkGrey};
    height: 100px;
    padding: 10px;
    gap: 10px;
    transition: background-color 0.3s;
    min-height: 100px;
    border-radius: 5px;
    &:hover {
        background-color: ${LightDarkGrey};
        cursor: pointer;
    }
`;

export const LampListCardTitle = styled.div`
    position: absolute;
    user-select: none;
    top: 5px;
    font-weight: bold;
    font-size: 25px;
    top: 10px;
    left: 10px;
    color: ${Yellow};
`;

export const LampListCardAdress = styled.div`
    position: absolute;
    user-select: none;
    top: 42.5px;
    left: 10px;
    color: ${White};
    font-style: italic;
    font-size: 20px;
`;

export const LampListCardBulb = styled.div`
    position: absolute;
    user-select: none;
    top: 70px;
    left: 10px;
    color: ${White};
    font-size: 20px;
`;

export const LampListCardInput = styled.input`
    position: absolute;
    width: 70%;
    height: 40px;
    top: 10px;
    left: 3%;
    border: none;
    border-radius: 5px;
    background-color: ${Black};
    color: ${White};
    user-select: none;
    font-size: 20px;
    padding-left: 10px;
    &:focus {
        outline: none;
    }
`;

export const LampListOrderButton = styled(BiSortDown)`
    position: absolute;
    right: 75px;
    top: 10px;
    font-size: 40px;
    color: ${Yellow};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const LampListFilterButton = styled(FaFilter)`
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 30px;
    color: ${Yellow};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const PaginationNextButton = styled(MdSkipNext)`
    position: absolute;
    right: 200px;
    top: 550px;
    font-size: 30px;
    color: ${Yellow};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
export const PaginationPreviousButton = styled(MdSkipPrevious)`
    position: absolute;
    right: 300px;
    top: 550px;
    font-size: 30px;
    color: ${Yellow};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
export const PaginationPagesButton = styled.div`
    position: absolute;
    right: 250px;
    top: 550px;
    font-size: 25px;
    color: ${Yellow};
    opacity: 1;
    transform: translateX(-50%);
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const PupFilterContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: ${Black + 'CC'};
    z-index: 999;
`;

export const PUpFilterContent = styled.div`
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
    pointer-events: all;
`;

export const PUpFilterTitle = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    color: ${Yellow};
    font-size: 30px;
    user-select: none;
    top: 10px;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    font-family: 'SyneRegular';
`;

export const PUpFilterCloseButton = styled(AiFillCloseCircle)`
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

export const PUpFilterDropdown = styled.select`
    position: absolute;
    width: 80%;
    height: 40px;
    top: 45%;
    left: 10%;
    border-radius: 5px;
    background-color: ${DarkGrey};
    color: ${White};
    user-select: none;
    font-size: 20px;
    padding-left: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

export const PUpFilterOption = styled.option`
    background-color: ${DarkGrey};
    color: ${White};
    font-size: 20px;
    cursor: pointer;

    &:hover {
        background-color: ${DarkYellow};
    }
`;

export const PupFilterSubtitle = styled.div`
    position: absolute;
    top: 30%;
    left: 10%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
`;

export const PupFilterApplyButton = styled.div`
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 40px;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: ${DarkYellow};
    }
`;

export const LampPupContainer = styled.div`
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

export const LampPupContent = styled.div`
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

export const LampPupTitle = styled.div`
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

export const LampPupClose = styled(AiFillCloseCircle)`
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

export const LampPupIconAdress = styled(RiMapPin2Line)`
    position: absolute;
    top: 20%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
`;

export const LampPupAdress = styled.div`
    position: absolute;
    top: 21.5%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    font-family: 'SyneRegular';
    width: 100%;
`;

export const LampPupGeoloc = styled.div`
    position: absolute;
    top: 32.5%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    font-family: 'SyneRegular';
    user-select: none;
`;

export const LampPupIconBulb = styled(Bulb)`
    position: absolute;
    top: 57.5%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;

export const LampPupBulb = styled.div`
    position: absolute;
    top: 59%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;

export const LampPupIconLamp = styled(GiStreetLight)`
    position: absolute;
    top: 75%;
    left: 10%;
    color: ${Yellow};
    font-size: 35px;
    user-select: none;
`;

export const LampPupHeight = styled.div`
    position: absolute;
    top: 76.5%;
    left: 25%;
    color: ${Yellow};
    font-size: 25px;
    user-select: none;
    font-family: 'SyneRegular';
`;

export const TotalLamp = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: ${Yellow};
    font-size: 20px;
    user-select: none;
    font-family: 'SyneRegular';
`;
