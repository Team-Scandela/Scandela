import styled from "styled-components";
import { Yellow, Black, White, Grey } from "../../colors";

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
`;

/** Button who allows to open the decision pannel */
export const DecisionMenuButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;

    background-color: ${(props) =>
        props.isDark ? Black + "CC" : White + "CC"};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;

    position: absolute;
    top: 50%;
    right: ${(props) => (props.show ? "102%" : "52%")};
    transform: ${(props) =>
        props.show ? "translate(0%, -50%)" : "translate(0%, -50%)"};
`;

/** Container of the decision pannel  */
export const DecisionPanel = styled.div`
    display: flex;
    width: 500px;
    height: 650px;
    border-radius: 20px 0px 0px 20px;
    overflow: hidden;
    font-size: 25px;

    background-color: ${(props) => (props.isDark ? Black : Yellow)};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0);

    position: absolute;
    top: 50%;
    right: ${(props) => (props.show ? "50%" : "0%")};

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
    font-weight: 500;
`;

/** Container of the decision panel content */
export const DecisionPanelContentContainer = styled.div`
    display: flex;
    position: absolute;
    width: 435px;
    height: 420px;
    left: 30px;
    top: 100px;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Grey : Grey)};
    border-bottom: 6px solid ${Yellow};
`;

/** Container that contain the scandela logo **/
export const LogoContainer = styled.img`
    display: flex;
    position: absolute;
    height: 60%;
    left: 20%;
    top: 20%;
    user-select: none;
    opacity: 0.3;
`;

export const DropdownContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 4%;
    top: 3%;
    height: 35px;
    width: 400px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? White : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    cursor: pointer;
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
    height: calc(100% - 80px);
    background-color: ${(props) => (props.isDark ? White : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    padding: 10px;
    transition: all 0.3s ease-in-out;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);

    ${DropdownContainer}:first-child {
        border-top: 2px solid ${(props) => (props.isDark ? Grey : Black)};
    }
`;

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
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
