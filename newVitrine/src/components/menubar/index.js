import {MenubarContainer, MenubarLogo, MenubarMenu, MenubarMenuItem} from './elements';
import logo from "../../assets/logo-128x128-white.png";

const Menubar = () => {
    return (
        <MenubarContainer>
            <MenubarLogo >
                <img src={logo} alt="Logo" />
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