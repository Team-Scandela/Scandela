import { CardsContainer } from './elements';
import { FaFileAlt } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { MdFeedback } from 'react-icons/md';
import { FaHandshake } from 'react-icons/fa';
import { Yellow, Green, Red, Grey } from '../../colors';
import Card from '../card';

const ContactCards = () => {
    return (
        <CardsContainer>
            <Card
                icon={<FaFileAlt color={Yellow} />}
                title="Support client"
                text="Des questions à propos de votre compte, de vos accès ou de vos factures ? L'équipe de support client est là pour vous aider."
            />
            <Card
                icon={<FaGear color={Grey} />}
                title="Support Technique"
                text="Un problème technique ? Vous pouvez directement nous contacter depuis notre application."
            />
            <Card
                icon={<MdFeedback color={Green} />}
                title="Feedback"
                text="Votre avis est important pour nous. N'hésitez pas à nous faire part de vos retours sur notre outil."
            />
            <Card
                icon={<FaHandshake color={Red} />}
                title="Partenariat"
                text="Vous souhaitez devenir partenaire de Scandela ? Contactez-nous pour en discuter !"
            />
        </CardsContainer>
    );
};

export default ContactCards;
