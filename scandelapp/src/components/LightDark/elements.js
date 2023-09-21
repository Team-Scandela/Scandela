import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';
import { FiSun, FiMoon } from 'react-icons/fi'

export const SunButton = styled(FiSun)`
    position: relative;
    top: 3px;
    cursor: pointer;

    &:hover {
        top: 2px;
  }
`;

export const MoonButton = styled(FiMoon)`
    position: relative;
    top: 3px;
    cursor: pointer;

    &:hover {
        top: 2px;
  }
`;
