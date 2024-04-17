import {useState} from 'react';
import {MenubarContainer, MenubarLogo, MenubarMenu, MenubarMenuItem} from './elements';
import logo from "../../assets/logo-128x128-white.png";
import hoverlogo from "../../assets/logo-128x128-yellow.png";

const Menubar = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <MenubarContainer>
            <MenubarLogo onMouseEnter={handleHover} onMouseLeave={handleHover}>
                <img src={isHovered ? hoverlogo : logo} alt="Logo" />
            </MenubarLogo>
            <MenubarMenu>
                <MenubarMenuItem>A propos</MenubarMenuItem>
                <MenubarMenuItem>Qui sommes nous</MenubarMenuItem>
                <MenubarMenuItem>Nos offres</MenubarMenuItem>
                <MenubarMenuItem>Notre outil</MenubarMenuItem>
            </MenubarMenu>
        </MenubarContainer>
    );
};

export default Menubar;