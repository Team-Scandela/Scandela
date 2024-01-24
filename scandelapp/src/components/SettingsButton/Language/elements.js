import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow } from '../../../colors';
import { FR, GB } from 'country-flag-icons/react/3x2';

export const FranceFlag = styled(FR)`
    display: flex;
    position: absolute;
    top: 185px;
    left: 100px;
    height: 70px;
    width: 70px;
`;

export const EnglishFlag = styled(GB)`
    display: flex;
    position: absolute;
    top: 185px;
    left: 300px;
    height: 70px;
    width: 70px;
`;
