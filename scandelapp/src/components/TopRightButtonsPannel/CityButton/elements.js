import styled from 'styled-components';
import { Yellow, Black, White } from '../../../colors';

/** Container for the background of the searchbar **/
export const SettingsButtonContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    width: 120px;
    height: 40px;
    top: 25px;
    right: 10px; /* Adjusted right padding */
    opacity: 0.8;
    background-color: ${(props) =>
        props.isDark ? `${Black}FF` : `${White}FF`};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        width: 100px;
        height: 30px;
        top: 15px;
        right: 5px;
    }

    @media screen and (max-width: 480px) {
        width: 80px;
        height: 25px;
        top: 10px;
        right: 2px;
    }
`;

export const NameOfCity = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 450;
    letter-spacing: 1px;

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }

    @media screen and (max-width: 480px) {
        font-size: 12px;
    }
`;
