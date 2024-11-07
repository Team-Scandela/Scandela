import styled from 'styled-components';
import { Yellow, Black, DarkGrey, White } from '../../colors';

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

/** Conteneur parent **/
export const PopupContainer = styled.div`
    position: absolute;
    display: flex;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    bottom: ${(props) => props.bottom};
    right: ${(props) => props.right};
    width: 500px;
    height: 300px;
    // background-color: ${White};
`;

/** Custom container for info popup **/
export const CustomContainerInfoPopup = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    top: 12%;
    left: 50%;
    height: ${(props) => props.height || 'auto'};
    width: ${(props) => props.width || 'auto'};
    padding: 10px 15px;
    background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border-radius: 5px;
    transform: translateX(-50%);
`;

/** Flèche **/
export const Arrow = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    transform: rotate(45deg);
    background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    transform: translateX(-50%) rotate(45deg);
`;


export const TitleText = styled.div`
    font-size: 20px;
    user-select: none;
    font-weight: 400;
    font-family: 'SyneRegular';
`;

export const DefaultText = styled.div`
    font-size: auto;
    user-select: none;
    font-weight: 400;
    font-family: 'SyneRegular';
`;
