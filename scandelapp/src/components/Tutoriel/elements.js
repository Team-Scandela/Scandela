import styled from 'styled-components';
import { Yellow, Black, DarkGrey } from '../../colors';

export const TutorielBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

/** Container for the skip tutoriel button **/
export const SkipTutoButtonContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 90%;
    left: 45%;
    height: 45px;
    width: 200px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border-radius: 5px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? Black : Black)};
    }
`;

export const SkipTutorielTitle = styled.div`
    font-size: 20px;
    user-select: none;
    font-weight: 400;
    font-family: 'SyneRegular';
`;