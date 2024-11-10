import styled from 'styled-components';
import { DarkYellow, Black, White, Grey } from '../../colors';
import { GoInfo } from 'react-icons/go';

export const SliderButtonContainer = styled.div`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 0%;
    left: 88.5%;
    background-color: ${Black + 'FF'};
    color: ${DarkYellow};
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translateY(150px)' : 'translateY(0px)'};
`;

export const SliderButtonButtonIcon = styled(GoInfo)`
    position: absolute;
    display: flex;
    margin-left: 10px;
    margin-top: 5px;
`;

export const PannelContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 220px;
    height: 150px;
    top: -19%;
    left: 83%;
    background-color: ${Black + 'FF'};
    padding: 30px 0px 30px 0px;

    border-radius: 0px 0px 8px 8px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
        props.show ? 'translateY(150px)' : 'translateY(0px)'};
`;

export const Text = styled.div`
    font-size: ${(props) => props.fontSize};
    font-weight: 550;
    user-select: none;
    font-family: 'SyneRegular';
    color: ${DarkYellow};
`;
