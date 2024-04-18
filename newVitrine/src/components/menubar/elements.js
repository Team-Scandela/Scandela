import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const MenubarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    padding: 0 10px;
    background-color: ${Black};
    color: ${White};
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;

export const MenubarLogo = styled.div`
    display: flex;
    align-items: center;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    z-index: 101;
    user-select: none;
    &:hover {
        color: ${Yellow};
    }
`;

export const MenubarMenu = styled.div`
    display: flex;
    align-items: center;
`;

export const MenubarItem = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px;
    cursor: pointer;
    user-select: none;
    &:hover {
        color: ${Yellow};
    }
    font-size: 20px;
`;

export const MenubarButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 16px;
    font-weight: 600;
    &:hover {
        background-color: ${White};
        color: ${Black};
    }
`;
