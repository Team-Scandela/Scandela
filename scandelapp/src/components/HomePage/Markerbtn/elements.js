import styled from 'styled-components';
import { Yellow, Black, White } from '../../../colors';

export const MarkerButton = styled.div`
    background-color: ${Yellow};
    cursor: pointer;
    height: ${(props) => props.small ? '48px' : '64px'};
    width: ${(props) => props.small ? '48px' : '64px'};
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

export const MarkerTitle = styled.div`
    position: absolute;
    top: ${(props) => `calc(${props.top}% + ${props.small ? '40px' : '50px'})`};
    left: ${(props) => props.left + '%'};
    font-size: ${(props) => props.small ? '20px' : '24px'};
    transform: translate(-50%, 0%);
    color: ${White};
    font-weight: bold;
    text-align: center;
`;