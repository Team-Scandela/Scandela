import styled from 'styled-components';
import { Yellow, Black} from '../../../colors';

export const BackButton = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;

    bottom: 50px;
    left: 50px;

    font-size: 100px;

    transform: translate(0%, 50%);

    color : ${Yellow};

    &:hover {
        cursor: pointer;
    }
    transition: all 0.7s ease-in-out;
`;