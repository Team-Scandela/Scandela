import React from 'react';
import {MenubarContainer, MenubarLogo, MenubarMenu, MenubarMenuItem} from './elements';
import logo from "../../assets/logo-128x128-white.png";

const Menubar = () => {
    return (
        <MenubarContainer>
            <MenubarLogo >
                <img src={logo} alt="Logo" />
            </MenubarLogo>
            <MenubarMenu>
                <MenubarMenuItem>Home</MenubarMenuItem>
                <MenubarMenuItem>Products</MenubarMenuItem>
                <MenubarMenuItem>Services</MenubarMenuItem>
                <MenubarMenuItem>Contact</MenubarMenuItem>
            </MenubarMenu>
        </MenubarContainer>
    );
};

export default Menubar;