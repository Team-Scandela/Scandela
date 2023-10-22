import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';

/** Container for premium button **/
export const PremiumButtonStyle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 40px;
    top: 25px;
    left: 1040px;
    user-select: none;
    opacity: 0.8;
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

/** Container for the version text **/
export const VersionText = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    top: 75px;
    left: 30px;
    user-select: none;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
`;

/** Container for the premium popup **/
export const PremiumButtonPopupContainer = styled.div`
    display: flex;
    position: absolute;
    width: 200px;
    height: 70px;
    top: 72px;
    left: 970px;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Black : Black)};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
`;

/** Container for premium button **/
export const PremiumButtonOnOffStyle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    top: 15px;
    left: 10px;
    user-select: none;
    opacity: 0.8;
    background-color: ${(props) =>
        props.isDark ? Yellow + 'CC' : Black + 'CC'};
    color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

/** Container for the version text **/
export const PremiumButtonOnOffText = styled.div`
    position: relative;
    font-size: 10px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 1000;
`;
