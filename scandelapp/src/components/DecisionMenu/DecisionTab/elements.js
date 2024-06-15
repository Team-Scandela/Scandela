import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../../colors';

export const DropdownContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;
    left: 3%;
    top: 3%;
    height: 35px;
    width: 94%;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? White : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    font-size: 17px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
    font-family: 'SyneRegular';
`;

export const DropdownRoundButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-color: ${(props) => (props.isDark ? Black : Yellow)};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Black)};
        color: ${(props) => (props.isDark ? Black : Yellow)};
    }
`;

export const DropdownMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3%;
    top: 13%;
    width: 94%;
    max-height: 85%;
    background-color: ${(props) => (props.isDark ? White : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    padding: 10px;
    transition: all 0.3s ease-in-out;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
    overflow-y: auto;

    ${DropdownContainer}:first-child {
        border-top: 2px solid ${(props) => (props.isDark ? Grey : Black)};
    }
`;

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    min-height: 35px;
    padding: 0 10px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    border-radius: 5px;
    background-color: ${(props) => (props.isDark ? Grey : Grey)};
    color: ${(props) => (props.isDark ? Black : Black)};
    font-size: 17px;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? White : White)};
    }
`;

export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3%;
    top: 13%;
    width: 94%;
    height: 77%;
    overflow-y: auto;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Yellow + 'FF'};
`;

export const AddToActionsListButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 30.75%;
    bottom: 2%;
    height: 30px;
    width: 210px;
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

/** Container that contain the scandela logo **/
export const LogoContainer = styled.img`
    display: flex;
    position: absolute;
    height: 60%;
    left: 21%;
    top: 20%;
    user-select: none;
    opacity: 0.3;
`;
