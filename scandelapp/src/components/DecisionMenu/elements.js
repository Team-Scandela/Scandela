import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkYellow } from '../../colors';

/** Container of the decision pannel and the button */
export const DecisionMenuContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(50%, -50%);
    width: 1000px;
    height: 625px;
    overflow: visible; /* To allow the button to overflow because of the overflow : hidden rules in App.css */
    z-index: 1;
    user-select: none;
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

/** Button who allows to open the decision pannel */
export const DecisionMenuButton = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 50%;
    right: ${(props) => (props.show ? '102%' : '52%')};
    width: 40px;
    height: 40px;
    border-radius: 10px;
    visibility: visible;

    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translate(0%, -50%)' : 'translate(0%, -50%)'};

    &:hover {
        cursor: pointer;
        color: ${(props) => (props.isDark ? Yellow : Black)};
    }
`;

/** Container of the decision pannel  */
export const DecisionPanel = styled.div`
    display: flex;
    width: 500px;
    height: 710px;
    border-radius: 20px 0px 0px 20px;
    overflow: hidden;
    font-size: 25px;

    background-color: ${(props) => (props.isDark ? Black : Yellow)};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0);

    position: absolute;
    top: 50%;
    right: ${(props) => (props.show ? '50%' : '0%')};

    transition: all 0.5s ease-in-out;

    transform: translate(0%, -50%);
`;

/** Main text on the decision page */
export const ScandelaText = styled.div`
    position: fixed;
    top: 25px;
    left: 40px;
    font-size: 45px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transform: perspective(10px) rotateX(2deg);
    letter-spacing: 2px;
    padding: 10px;
    background: linear-gradient(to right, ${Yellow}, #ffd700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

/** Container of the decision panel content */
export const DecisionPanelContentContainer = styled.div`
    display: flex;
    position: absolute;
    width: 435px;
    height: 450px;
    left: 30px;
    top: 100px;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Grey : Grey)};
    border-bottom: 6px solid ${Yellow};
`;

export const DecisionPanelContentArrow = styled.div`
    display: flex;
    position: absolute;
    top: 530px;
    left: 230px;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
`;

/** Container that contain the scandela logo **/
export const LogoContainer = styled.img`
    display: flex;
    position: absolute;
    height: 60%;
    left: 12%;
    top: 20%;
    user-select: none;
    opacity: 0.3;
`;

export const DropdownContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;
    left: 4%;
    top: 3%;
    height: 35px;
    width: 400px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? White : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    font-size: 17px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
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
    left: 4%;
    top: 13%;
    width: 400px;
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

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? White : White)};
    }
`;

export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 4%;
    top: 13%;
    width: 400px;
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
    left: 4%;
    bottom: 2%;
    height: 30px;
    width: 400px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? Black : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? Black : Black)};
    }
`;
