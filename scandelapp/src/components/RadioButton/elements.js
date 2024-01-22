import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkYellow } from '../../colors';

export const MainContainer = styled.div`
    display: flex;
    position: absolute;
    height: 40px;
    width: 70px;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    background-color: ${(props) => (props.isDark ? Black + 'CC' : Grey + 'CC')};
    border-radius: 25px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    position: absolute;
    height: 36px;
    width: 36px;
    top: 2px;
    left: ${(props) => (props.trigger ? '3px' : '31px')};
    background-color: ${(props) => (props.isDark ? Grey + 'CC' : White + 'CC')};
    border-radius: 25px;

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isDark ? DarkYellow + 'CC' : DarkYellow + 'CC'};
    }
`;
