import styled from 'styled-components';
import { Yellow, Black} from '../../../colors';

export const MarkerButton = styled.div`
    background-color: ${Yellow};
    cursor: pointer;
    height: 64px;
    width: 64px;
    z-index: 1;
    position: absolute;
    top: ${(props) => props.top + '%'};
    left: ${(props) => props.left + '%'};
    transform: translate(-50%, -50%) rotate(45deg);
    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
        transform: rotate(-45deg);
        width: 75%;
        height: 75%;
    }
`;