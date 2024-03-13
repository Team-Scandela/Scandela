import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const TrafficTimeContainer = styled.div`
    display: flex;
    position: absolute;
    width: 60px;
    height: 40px;
    bottom: 100px;
    left: 90px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    z-index: 1000000;
    justify-content: center;
    align-items: center;
    padding: 0 2px 0 2px;
`;

export const TrafficTimeInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    border-radius: 10px;

    &::placeholder {
        color: ${(props) => (props.isDark ? Yellow : Black)};
        opacity: 0.5;
    }
`;