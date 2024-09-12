import styled from 'styled-components';
import { Yellow, Black } from '../../../../colors';

export const ReferenceInputContainer = styled.input`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 25px;
    top: 20%;
    left: 15%;
    font-family: 'SyneRegular';
    border-radius: 6px;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};

    @media (max-width: 992px) {
        width: 250px;
        height: 22px;
        top: 18%;
        left: 10%;
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 20px;
        top: 15%;
        left: 5%;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 18px;
        top: 12%;
        left: 5%;
    }
`;

export const IntensityInputContainer = styled.input`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 25px;
    top: 29%;
    left: 15%;
    font-family: 'SyneRegular';
    border-radius: 6px;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};

    @media (max-width: 992px) {
        width: 250px;
        height: 22px;
        top: 26%;
        left: 10%;
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 20px;
        top: 22%;
        left: 5%;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 18px;
        top: 18%;
        left: 5%;
    }
`;

export const ConsommationInputContainer = styled.input`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 25px;
    top: 38%;
    left: 15%;
    font-family: 'SyneRegular';
    border-radius: 6px;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};

    @media (max-width: 992px) {
        width: 250px;
        height: 22px;
        top: 34%;
        left: 10%;
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 20px;
        top: 30%;
        left: 5%;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 18px;
        top: 25%;
        left: 5%;
    }
`;

export const ValidateButtonContainer = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    left: 38%;
    top: 85.5%;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Yellow : Black)};
    color: ${(props) => (props.isDark ? Black : Yellow)};
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 992px) {
        width: 90px;
        height: 35px;
        left: 35%;
        top: 82%;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        width: 80px;
        height: 30px;
        left: 30%;
        top: 80%;
        font-size: 12px;
    }

    @media (max-width: 576px) {
        width: 70px;
        height: 28px;
        left: 25%;
        top: 75%;
        font-size: 10px;
    }
`;
