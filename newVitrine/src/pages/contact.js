import Page from './page';
import ContactCards from '../components/contactcards';
import ContactButton from '../components/contactbutton';

const Contact = () => {
    return (
        <Page
            title="Comment nous contacter ?"
            text="Nous sommes à votre disposition pour répondre à vos questions et vous aider dans vos démarches."
            header={true}
        >
            <ContactCards />
            <ContactButton />
        </Page>
    );
};

export default Contact;
