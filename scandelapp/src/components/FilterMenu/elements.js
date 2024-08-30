import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

/** Button who allows to open the container of filters */
export const FilterMenuButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;
    opacity: 0.9;

    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    position: fixed;
    bottom: 30px;
    left: 30px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    @media (max-width: 1200px) {
        width: 35px;
        height: 35px;
        font-size: 22px;
    }

    @media (max-width: 992px) {
        width: 30px;
        height: 30px;
        font-size: 20px;
    }

    @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        font-size: 18px;
    }

    @media (max-width: 576px) {
        width: 20px;
        height: 20px;
        font-size: 16px;
        bottom: 20px;
        left: 20px;
    }
`;

/** Container of map filters */
export const FilterMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.show ? '300px' : '0px')};
    height: ${(props) => (props.show ? '40px' : '0px')};
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    position: fixed;
    bottom: 30px;
    left: 90px;

    @media (max-width: 1200px) {
        width: ${(props) => (props.show ? '250px' : '0px')};
        font-size: 22px;
    }

    @media (max-width: 992px) {
        width: ${(props) => (props.show ? '200px' : '0px')};
        font-size: 20px;
    }

    @media (max-width: 768px) {
        width: ${(props) => (props.show ? '150px' : '0px')};
        font-size: 18px;
    }

    @media (max-width: 576px) {
        width: ${(props) => (props.show ? '100px' : '0px')};
        height: ${(props) => (props.show ? '30px' : '0px')};
        font-size: 16px;
        bottom: 20px;
        left: 70px;
    }
`;
