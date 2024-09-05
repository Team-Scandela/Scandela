import styled from 'styled-components';
import { Black, DarkGrey, Yellow, White, Grey, DarkYellow, LightDarkGrey } from '../../../colors';
import { BiSortDown } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";

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
    }
`;

export const LampListCardTitle = styled.div`
    position: absolute;
    user-select: none;
    top: 5px;
    font-weight: bold;
    font-size: 25px;
    top : 10px;
    left : 10px;
    color : ${Yellow};
`;

export const LampListCardAdress = styled.div`
    position: absolute;
    user-select: none;
    top: 42.5px;
    left: 10px;
    color : ${White};
    font-style: italic;
    font-size: 20px;
`;

export const LampListCardBulb = styled.div`
    position: absolute;
    user-select: none;
    top: 70px;
    left: 10px;
    color : ${White};
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
    color : ${White};
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