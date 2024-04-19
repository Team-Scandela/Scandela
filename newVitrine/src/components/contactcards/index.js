import { CardsContainer, CardPic, CardTitle, CardText, Card } from './elements';
import { FaFileAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { Yellow, Green, Red, Grey } from '../../colors';

const ContactCards = () => {
    return (
        <CardsContainer>
            <Card>
                <CardPic><FaFileAlt color={Yellow} /></CardPic>
                <CardTitle>Support client</CardTitle>
                <CardText>Des questions à propos de votre compte, de vos accès ou de vos factures ? L'équipe de support client est là pour vous aider.</CardText>
            </Card>
            <Card>
                <CardPic><FaGear color={Grey}/></CardPic>
                <CardTitle>Support Technique</CardTitle>
                <CardText>Il y a un problème technique avec notre outil. Nous sommes là pour les résoudre</CardText>
            </Card>
            <Card>
                <CardPic><MdFeedback color={Green}/></CardPic>
                <CardTitle>Feedback</CardTitle>
                <CardText>Votre avis est important pour nous. N'hésitez pas à nous faire part de vos retours sur notre outil.</CardText>
            </Card>
            <Card>
                <CardPic><FaHandshake color={Red}/></CardPic>
                <CardTitle>Partenariat</CardTitle>
                <CardText>Vous souhaitez devenir partenaire de notre outil ? Contactez-nous pour en discuter.</CardText>
            </Card>
        </CardsContainer>
    );
};

export default ContactCards;