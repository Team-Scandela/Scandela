import { FooterContainer, FooterColumn, FooterTitle, FooterText } from './elements';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterColumn>
                <FooterTitle>Scandela</FooterTitle>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><FooterText>Accueil</FooterText></Link>
                <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}><FooterText>A propos</FooterText></Link>
                <Link to="/us" style={{ textDecoration: 'none', color: 'inherit' }}><FooterText>Qui sommes nous</FooterText></Link>
                <Link to="/offers" style={{ textDecoration: 'none', color: 'inherit' }}><FooterText>Nos offres</FooterText></Link>
                <Link to="/tools" style={{ textDecoration: 'none', color: 'inherit' }}><FooterText>Nos outils</FooterText></Link>
            </FooterColumn>
            <FooterColumn>
                <FooterTitle>Nous contacter</FooterTitle>
                <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}><FooterText>Formulaire de contact</FooterText></Link>
                <FooterText>
                    <a href="mailto:scandela.eip@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Mail
                    </a>
                </FooterText>
            </FooterColumn>
        </FooterContainer>
    );
};

export default Footer;