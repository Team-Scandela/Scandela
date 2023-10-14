import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const ProfilMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 400px;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};    position: fixed;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 90px;
    right: 200px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
`;
