import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow } from '../../../colors';
import { FiSun, FiMoon } from 'react-icons/fi';

export const SunButton = styled(FiSun)`
    display: flex;
    position: absolute;
    top: 200px;
    left: 285px;
    color: ${DarkYellow};
`;

export const MoonButton = styled(FiMoon)`
    display: flex;
    position: absolute;
    top: 200px;
    left: 150px;
    color: ${DarkYellow};
`;
