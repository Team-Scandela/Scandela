import {
    HomeContactContainer,
    HomeContactCard,
    HomeContactTitle,
    HomeContactText,
    HomeContactButton,
} from './elements';
import { FaEnvelope } from 'react-icons/fa';

const HomeContact = () => {
    return (
        <HomeContactContainer>
            <HomeContactCard>
                <HomeContactTitle>Contactez-nous</HomeContactTitle>
                <HomeContactText>
                    Vous avez des questions ? N'hésitez pas à nous contacter
                </HomeContactText>
                <HomeContactButton
                    onClick={() =>
                        (window.location.href = 'mailto:scandela.eip@gmail.com')
                    }
                >
                    <FaEnvelope />
                </HomeContactButton>
            </HomeContactCard>
        </HomeContactContainer>
    );
};

export default HomeContact;
