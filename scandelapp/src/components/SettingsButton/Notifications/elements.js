import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow } from '../../../colors';

export const NotificationTitle = styled.div`
    display: flex;
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    font-size: 17px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 500;
`;