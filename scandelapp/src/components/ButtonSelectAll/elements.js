import styled from "styled-components";
import { Yellow, Black, Grey } from '../../colors';
import { BsListCheck } from 'react-icons/bs';

/** Container for the background of the searchbar **/
export const ButtonEditContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center; /* Ajout de cette ligne */
    width: 55px;
    height: 55px;
    top: 25px;
    right: 40px;
    background-color: ${props => props.isDark ? Grey + 'FF': Grey + 'FF' };
    border-radius: 10px;
    transition: opacity 0.1s;

    &:hover {
      cursor: pointer;
      background-color: ${props => props.isDark ? Grey + 'CC': Grey + 'CC' };
    }
`;


/**  Export Icon**/
export const SelectIcon = styled(BsListCheck)`
    position: absolute;
    align-items: center;
    right: 10px;
    font-size: 40px;
    color: ${props => props.isDark ? Black : Yellow};
`;
