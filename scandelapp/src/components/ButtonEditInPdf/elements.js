import styled from "styled-components";
import { Yellow, Black, White } from '../../colors';
import { CiExport } from 'react-icons/ci';

/** Container for the background of the searchbar **/
export const ButtonEditContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    width: 60px;
    height: 60px;
    top: 25px;
    left: 80%;
    background-color: ${props => props.isDark ? White + 'CC': Black + 'CC' };
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      background-color: ${props => props.isDark ? White + '99': Black + '99' };
    }
`;

/**  Export Icon**/
export const ExportIcon = styled(CiExport)`
    position: absolute;
    right : 10px;
    font-size : 40px;
    color : ${props => props.isDark ? Black : Yellow};
`;