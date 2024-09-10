import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow, DarkGrey } from '../../../colors';

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

export const CityButton = styled.div`
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

export const LightModeButton = styled.div`
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

export const LanguageButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 165px;
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

export const NotificationButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 245px;
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

export const BackToLandingPageButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 325px;
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

/** Main title on the content container */
export const TitleText = styled.div`
    position: relative;
    top: 5%;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 500;
    font-family: 'SyneRegular';
`;
