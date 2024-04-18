import {useState} from 'react';
import {MenubarContainer, MenubarLogo, MenubarMenu, MenubarMenuItem} from './elements';
import logo from "../../assets/logo-128x128-white.png";
import hoverlogo from "../../assets/logo-128x128-yellow.png";
import {Link} from 'react-router-dom';

const Menubar = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <MenubarContainer>
            <MenubarLogo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link to="/"><img src={isHovered ? hoverlogo : logo} alt="Logo" /></Link>
            </MenubarLogo>
            <MenubarMenu>
                <MenubarMenuItem>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>A propos</Link>
                </MenubarMenuItem>
                <MenubarMenuItem>
                    <Link to="/us" style={{ textDecoration: 'none', color: 'inherit' }}>Qui sommes nous</Link>
                </MenubarMenuItem>
                <MenubarMenuItem>
                    <Link to="/offers" style={{ textDecoration: 'none', color: 'inherit' }}>Nos offres</Link>
                </MenubarMenuItem>
                <MenubarMenuItem>
                    <Link to="/tools" style={{ textDecoration: 'none', color: 'inherit' }}>Nos outils</Link>
                </MenubarMenuItem>
            </MenubarMenu>
        </MenubarContainer>
    );
};

export default Menubar;