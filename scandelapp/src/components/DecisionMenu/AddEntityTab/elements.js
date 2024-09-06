import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow, DarkGrey } from '../../../colors';
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ModifyEntityButton/elements.js
import { MdChangeCircle } from 'react-icons/md';

export const ModifyEntityButtonContainer = styled(MdChangeCircle)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    right: 355px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Yellow
                : Black
            : props.isDark
              ? Black + 'CC'
              : White + 'CC'};
    color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Black
                : White
            : props.isDark
              ? Yellow
              : Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

export const ModifyEntityPannelContainer = styled.div`
    display: flex;
    position: fixed;
    width: 600px;
    height: 420px;
    background-color: ${(props) => (props.isDark ? Yellow : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 90px;
    left: 500px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;
=======
>>>>>>> master:scandelapp/src/components/DecisionMenu/AddEntityTab/elements.js

export const ButtonsMenuContainer = styled.div`
    display: flex;
    position: absolute;
    width: 110px;
    height: 94%;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 3%;
    left: 2%;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;

export const ContentContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    width: 430px;
    height: 94%;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 3%;
    right: 2%;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;

export const BulbButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 5px;
    left: 5px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
        color: ${(props) => (props.isDark ? DarkYellow : White)};
        cursor: pointer;
    }
`;

export const LampButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 85px;
    left: 5px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
        color: ${(props) => (props.isDark ? DarkYellow : White)};
        cursor: pointer;
    }
`;

export const TitleText = styled.div`
    position: relative;
    top: 5%;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 500;
    font-family: 'SyneRegular';
`;
