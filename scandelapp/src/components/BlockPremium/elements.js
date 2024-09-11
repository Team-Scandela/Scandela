import styled from 'styled-components';
import {
    Yellow,
    Black,
    DarkGrey,
    DarkYellow,
    White,
    Grey,
    LightDarkGrey,
} from '../../colors';

export const BlockPremiumContainer = styled.div`
display: flex;
    flex-direction: column;
    padding: 20px;
    width: auto;
    max-width: 600px;
    height: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) => (props.isDark ? Black : White)};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    color: ${(props) => (props.isDark ? White : Black)};

    h2 {
        margin: 0;
    }

    p {
        margin: 10px 0 20px;
        text-align: center;
    }
`;

export const BlockPremiumRedirectButton = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => (props.isDark ? Yellow : DarkYellow)};
    color: ${(props) => (props.isDark ? Black : White)};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkYellow : Yellow)};
    }
`;
