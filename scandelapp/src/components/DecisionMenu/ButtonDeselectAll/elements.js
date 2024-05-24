import styled from 'styled-components';
import { Yellow, Black, Grey } from '../../../colors';
import { CgPlayListRemove } from 'react-icons/cg';

/** Container for the deselect all button **/
export const ButtonDeselectAllContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center; /* Ajout de cette ligne */
    width: 55px;
    height: 55px;
    top: 25px;
    right: 40px;
    background-color: ${(props) => (props.isDark ? Grey + 'FF' : Grey + 'FF')};
    border-radius: 10px;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isDark ? Grey + 'CC' : Grey + 'CC'};
    }
`;

/**  Deselect All Icon**/
export const DeselectAllIcon = styled(CgPlayListRemove)`
    display: flex;
    align-items: center;
    font-size: 40px;
    height: 50px;
    width: 50px;
    color: ${(props) => (props.isDark ? Black : Yellow)};
`;
