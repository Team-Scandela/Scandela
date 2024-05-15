import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow, DarkGrey } from '../../../colors';
import { IoMdSettings } from 'react-icons/io';

/** Container for the settings button **/
export const SettingsButtonContainer = styled(IoMdSettings)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    right: 230px;
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

export const SettingsPannelContainer = styled.div`
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

export const ButtonsMenuContainer = styled.div`
    display: flex;
    position: relative;
    width: 110px;
    height: 400px;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 10px;
    left: 10px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;

export const ContentContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    width: 460px;
    height: 400px;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 10px;
    left: 20px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
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

export const DownloadButton = styled.div`
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

/** Main title on the content container */
export const TitleText = styled.div`
    position: relative;
    top: 5%;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transform: perspective(10px) rotateX(2deg);
    letter-spacing: 2px;
    background: linear-gradient(to right, ${Yellow}, #ffd700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;
