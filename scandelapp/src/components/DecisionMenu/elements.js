import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkYellow, DarkGrey } from '../../colors';
import { Tabs } from '../../pages/main';
import logoLight from '../../assets/logo-128x128.png';

/** Container of the decision pannel and the button */
export const DecisionMenuContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(50%, -50%);
    width: 1200px;
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

    transition: all 0.7s ease-in-out;
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
    width: 600px;
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

    transition: all 0.7s ease-in-out;

    transform: translate(0%, -50%);
`;

/** Container of the decision menu buttons */
export const DecisionMenuButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 570px;
    height: 50px;
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? DarkGrey : DarkGrey)};
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);
`;

/** Container of the decision menu tab button */
export const DecisionMenuTabButton = styled.div`
    flex: ${({ isSelected }) => (isSelected ? '2' : '1')};
    max-width: ${({ isSelected }) => (isSelected ? '280px' : '70px')};
    height: 46px;
    border-radius: 8px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Black : Grey)};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 2px 0px 2px;
    transition:
        flex 0.2s ease-in-out,
        max-width 0.2s ease-in-out,
        background-color 0.2s ease-in-out,
        color 0.2s ease-in-out;

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Black)};
        color: ${(props) => (props.isDark ? Black : Yellow)};
        cursor: pointer;
    }
`;
/** Container of the text inside the tabs buttons */
export const TabButtonText = styled.div`
    font-size: ${({ fontSize }) => fontSize};
    font-family: 'SyneBold';
    opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
    transition: opacity 0.3s ease-in-out;
`;

/** Container of the scandela logo **/
export const LogoContainer = styled.img`
    height: 85%;
    padding: 3px;
    user-select: none;

    ${DecisionMenuTabButton}:hover & {
        content: url(${logoLight});
    }
`;

/** Container of the decision menu content */
export const DecisionMenuContentContainer = styled.div`
    display: flex;
    position: absolute;
    width: 570px;
    height: ${({ currentTab }) =>
        currentTab === Tabs.Scandela ? '495px' : '620px'};
    left: 15px;
    top: 77px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? DarkGrey : DarkGrey)};
    border-bottom: 6px solid ${Yellow};
`;
