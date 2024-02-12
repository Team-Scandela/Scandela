import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const FilterSearchContainer = styled.div`
    display: flex;
    position: absolute;
    width: 400px;
    height: 40px;
    bottom: 100px;
    left: 90px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    z-index: 1000000;
`;

export const FilterSearchDropdown = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
`;

export const FilterSearchDropdownItem = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 33%;
    top: ${(props) => props.index * 33}%;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 20px;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    justify-content: center;
    align-items: center;

    &:hover {
        transform: scale(1.1);
    }
`;

export const FilterSearchSelected = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    left: 10px;
    transition: all 0.2s ease-in-out;
    font-size: 20px;
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    padding: 0 10px;
    width: 25%;

    &:hover {
        cursor: pointer;
    }
`;

export const FilterSearchInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    left: 25%;
    width: 75%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    border-radius: 10px;
    padding: 0 10px;
`;
