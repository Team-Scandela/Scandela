import styled from "styled-components";
import { Yellow, Black, White } from '../../colors';
import { MdOutlineChecklist } from 'react-icons/md';

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
    background-color: ${props => props.isDark ? White + 'FF': Black + 'FF' };
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      background-color: ${props => props.isDark ? White + 'CC': Black + 'CC' };
    }
`;


/**  Export Icon**/
export const SelectIcon = styled(MdOutlineChecklist)`
    position: absolute;
    align-items: center;
    right: 10px;
    font-size: 40px;
    color: ${props => props.isDark ? Black : Yellow};
`;
