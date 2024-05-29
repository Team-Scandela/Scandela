import styled from 'styled-components';
import { Yellow, Black, Grey } from '../../../colors';
import { CgPlayListCheck } from 'react-icons/cg';

/** Container for the select all button **/
export const ButtonSelectAllContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center; /* Ajout de cette ligne */
    width: 55px;
    height: 55px;
    top: 25px;
    right: 110px;
    background-color: ${(props) => (props.isDark ? Grey + 'FF' : Grey + 'FF')};
    border-radius: 10px;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isDark ? Grey + 'CC' : Grey + 'CC'};
    }
`;

/**  Select All Icon**/
export const SelectAllIcon = styled(CgPlayListCheck)`
    display: flex;
    align-items: center;
    font-size: 40px;
    height: 50px;
    width: 50px;
    color: ${(props) => (props.isDark ? Black : Yellow)};
`;
