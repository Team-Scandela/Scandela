import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

/** Button who allows to open the container of filters */
export const LassoButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    user-select: none;
    font-size: 25px;

    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    position: fixed;
    bottom: 100px;
    left: 30px;
`;