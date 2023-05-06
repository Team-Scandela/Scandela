import styled from 'styled-components'
import { Yellow, Black, White } from '../../colors';

/** Button who allows to open the container of filters */
export const FilterMenuButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    bottom: 30px;
    left: 30px;
`;

/** Conatainer of map filters */
export const FilterMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: ${props => props.show ? '300px' : '0px'};
    height: ${props => props.show ? '40px' : '0px'};
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    bottom: 30px;
    left: 90px;
`;


