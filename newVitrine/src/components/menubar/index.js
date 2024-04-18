import {useState} from 'react';
import {MenubarContainer, MenubarLogo, MenubarMenu, MenubarItem, MenubarButton} from './elements';
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
                <MenubarItem>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>A propos</Link>
                </MenubarItem>
                <MenubarItem>
                    <Link to="/offers" style={{ textDecoration: 'none', color: 'inherit' }}>Nos offres</Link>
                </MenubarItem>
                <MenubarItem>
                    <Link to="/tools" style={{ textDecoration: 'none', color: 'inherit' }}>Notre solution</Link>
                </MenubarItem>
                <MenubarButton>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
                </MenubarButton>
                <MenubarButton>
                    <a href="https://app.scandela.fr" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>Connexion</a>
                </MenubarButton>
            </MenubarMenu>
        </MenubarContainer>
    );
};

export default Menubar;