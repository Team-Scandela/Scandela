import styled from 'styled-components';
import { Yellow, Black } from '../../../../colors';

/** Container for the select all button */
export const ButtonSelectAllContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 3%;
    bottom: 2%;
    height: 30px;
    width: 155px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? Black : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? Black : Black)};
    }
`;
