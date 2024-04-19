import Page from './page';
import ContactCards from '../components/contactcards';
import ContactButton from '../components/contactbutton';


const Contact = () => {
    return (
        <Page title="Contactez-nous" text="Nous sommes à votre disposition pour répondre à vos questions et vous aider dans vos démarches.">
            <ContactCards />
            <ContactButton />
        </Page>
    );
};

export default Contact;