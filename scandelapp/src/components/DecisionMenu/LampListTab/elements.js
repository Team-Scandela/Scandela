import styled from 'styled-components';
import { Black, DarkGrey, Yellow, White, Grey, DarkYellow, LightDarkGrey } from '../../../colors';

export const LampListContainer = styled.div`
    display: flex;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 94%;
    height: 80%;
    overflow: visible;
    z-index: 1;
    user-select: none;
    background-color: ${Black};
    border-radius: 5px;
`;