import styled from 'styled-components';
import { DarkYellow } from '../../../../colors';
import { FiSun, FiMoon } from 'react-icons/fi';

export const SunButton = styled(FiSun)`
    display: flex;
    position: absolute;
    top: 200px;
    left: 130px;
    color: ${DarkYellow};
`;

export const MoonButton = styled(FiMoon)`
    display: flex;
    position: absolute;
    top: 200px;
    left: 265px;
    color: ${DarkYellow};
`;
