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

    @media (max-width: 992px) {
        width: 90px;
        height: 80%;
        top: 5%;
        left: 1%;
    }

    @media (max-width: 768px) {
        width: 70px;
        height: 70%;
        top: 7%;
        left: 0.5%;
    }

    @media (max-width: 576px) {
        width: 50px;
        height: 60%;
        top: 10%;
        left: 0.5%;
    }
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

    @media (max-width: 992px) {
        width: 350px;
        height: 80%;
        top: 5%;
        right: 1%;
    }

    @media (max-width: 768px) {
        width: 270px;
        height: 70%;
        top: 7%;
        right: 0.5%;
    }

    @media (max-width: 576px) {
        width: 200px;
        height: 60%;
        top: 10%;
        right: 0.5%;
    }
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

    @media (max-width: 992px) {
        width: 80px;
        height: 60px;
        top: 5px;
        left: 5px;
    }

    @media (max-width: 768px) {
        width: 70px;
        height: 50px;
        top: 5px;
        left: 5px;
    }

    @media (max-width: 576px) {
        width: 60px;
        height: 40px;
        top: 5px;
        left: 5px;
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

    @media (max-width: 992px) {
        width: 80px;
        height: 60px;
        top: 85px;
        left: 5px;
    }

    @media (max-width: 768px) {
        width: 70px;
        height: 50px;
        top: 85px;
        left: 5px;
    }

    @media (max-width: 576px) {
        width: 60px;
        height: 40px;
        top: 85px;
        left: 5px;
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

    @media (max-width: 992px) {
        font-size: 22px;
        top: 4%;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        top: 3%;
    }

    @media (max-width: 576px) {
        font-size: 16px;
        top: 2%;
    }
`;
