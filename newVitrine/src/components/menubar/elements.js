import styled from 'styled-components';

export const MenubarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 0 10px;
    background-color: #2A2B2A;
    color: #F9F9F9;
    font-size: 14px;
    font-weight: 600;
    position: fixed;
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
`;

export const MenubarMenu = styled.div`
    display: flex;
    align-items: center;
`;

export const MenubarMenuItem = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px;
    cursor: pointer;
`;

