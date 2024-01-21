import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';
import { IoMdSettings } from 'react-icons/io';

/** Container for the settings button **/
export const SettingsButtonContainer = styled(IoMdSettings)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    left: 1255px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

export const SettingsPannelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1000px;
    height: 600px;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    position: fixed;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 90px;
    right: 300px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
    z-index: 2;
`;
