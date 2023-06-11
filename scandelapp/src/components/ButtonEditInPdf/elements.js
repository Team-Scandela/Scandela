import styled from "styled-components";
import { Yellow, Black, White, Grey } from '../../colors';
import { CiExport } from 'react-icons/ci';

/** Container for the background of the searchbar **/
export const ButtonEditContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center; /* Ajout de cette ligne */
    width: 55px;
    height: 55px;
    top: 25px;
    left: 65%;
    background-color: ${props => props.isDark ? Grey + 'FF': Grey + 'FF' };
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      background-color: ${props => props.isDark ? Grey + 'CC': Grey + 'CC' };
    }
`;

/**  Export Icon**/
export const ExportIcon = styled(CiExport)`
    position: absolute;
    align-items: center;
    font-size: 40px;
    color: ${props => props.isDark ? Black : Yellow};
`;
