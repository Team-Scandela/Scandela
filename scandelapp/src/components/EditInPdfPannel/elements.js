import styled from 'styled-components';
import { Yellow, Black, White, Grey, DarkGrey, LightDarkGrey } from '../../../colors';
import { AiOutlineDownload } from 'react-icons/ai';

/** Container for the background of the searchbar **/
export const PannelContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 700px;
    height: 180px;
    top: 75%;
    left: 10%;
    background-color: ${(props) => (props.isDark ? White + 'CC' : Black + 'CC')};
    border-radius: 10px;
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    transition: all 0.3s ease-in-out;

    @media (max-width: 992px) {
        width: 600px;
        height: 150px;
        top: 70%;
        left: 5%;
    }

    @media (max-width: 768px) {
        width: 500px;
        height: 120px;
        top: 65%;
        left: 2%;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: auto;
        top: 60%;
        left: 5%;
        flex-direction: column;
    }
`;

export const PannelText = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 35px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    font-weight: 600;

    @media (max-width: 992px) {
        font-size: 30px;
        top: 20px;
        left: 20px;
    }

    @media (max-width: 768px) {
        font-size: 25px;
        top: 15px;
        left: 15px;
    }

    @media (max-width: 576px) {
        font-size: 20px;
        top: 10px;
        left: 10px;
    }
`;

export const ExportButton = styled.div`
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 50px;
    top: 100px;
    left: 30px;
    right: 30px;
    background-color: ${(props) => (props.isDark ? White + 'FF' : Black + 'FF')};
    border-radius: 5px;
    box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.4);

    @media (max-width: 992px) {
        height: 45px;
        top: 90px;
        left: 25px;
        right: 25px;
    }

    @media (max-width: 768px) {
        height: 40px;
        top: 80px;
        left: 20px;
        right: 20px;
    }

    @media (max-width: 576px) {
        height: 35px;
        top: 70px;
        left: 15px;
        right: 15px;
    }
`;

export const ExportText = styled.div`
    position: absolute;
    left: 15px;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    font-weight: 400;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 992px) {
        font-size: 22px;
        left: 10px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        left: 5px;
    }

    @media (max-width: 576px) {
        font-size: 16px;
        left: 5px;
    }
`;

export const ExportIcon = styled(AiOutlineDownload)`
    position: absolute;
    align-items: center;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    opacity: 1;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }

    @media (max-width: 992px) {
        font-size: 35px;
        right: 10px;
    }

    @media (max-width: 768px) {
        font-size: 30px;
        right: 5px;
    }

    @media (max-width: 576px) {
        font-size: 25px;
        right: 5px;
    }
`;
