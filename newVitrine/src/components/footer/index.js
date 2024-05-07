import {
    FooterContainer,
    FooterColumn,
    FooterTitle,
    FooterText,
    FooterButton,
    FooterLogo,
} from './elements';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-128x128-white.png';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterColumn>
                <FooterLogo>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </FooterLogo>
            </FooterColumn>

            <FooterColumn>
                <FooterTitle>Scandela</FooterTitle>
                <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <FooterText>Accueil</FooterText>
                </Link>
                <Link
                    to="/about"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <FooterText>A propos</FooterText>
                </Link>
                <Link
                    to="/offers"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <FooterText>Nos offres</FooterText>
                </Link>
                <Link
                    to="/features"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <FooterText>Nos outils</FooterText>
                </Link>
            </FooterColumn>
            <FooterColumn>
                <FooterTitle>Nous contacter</FooterTitle>
                <Link
                    to="/contact"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <FooterText>Formulaire de contact</FooterText>
                </Link>
                <FooterText>
                    <a
                        href="mailto:scandela.eip@gmail.com"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        Mail
                    </a>
                </FooterText>
            </FooterColumn>
            <FooterColumn>
                <FooterText /> {/* empty line don't remove */}
                <FooterText />
                <FooterText />
                <FooterText />
                <a
                    href="https://app.scandela.fr"
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <FooterButton>Connexion</FooterButton>
                </a>
            </FooterColumn>
        </FooterContainer>
    );
};

export default Footer;
