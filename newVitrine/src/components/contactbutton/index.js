import {
    ContactButtonContainer,
    ContactButtonMain,
    ContactButtonIcon,
} from './elements';
import { FaEnvelope } from 'react-icons/fa';

const ContactButton = () => {
    return (
        <ContactButtonContainer>
            <ContactButtonMain
                onClick={() =>
                    (window.location.href = 'mailto:scandela.eip@gmail.com')
                }
            >
                <ContactButtonIcon>
                    <FaEnvelope />
                </ContactButtonIcon>
                scandela.eip@gmail.com
            </ContactButtonMain>
        </ContactButtonContainer>
    );
};

export default ContactButton;
