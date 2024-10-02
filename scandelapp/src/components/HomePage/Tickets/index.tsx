import { useState } from 'react';
import {
    TicketsContainer,
    TicketsRectangle,
    CloseButton,
    TicketsTitle,
    DropdownContainer,
    DropdownItem,
    TicketDescriptionInput,
    TicketTitleInput,
    SendButton,
} from './elements';
import { useTranslation } from 'react-i18next';

interface TicketsProps {
    closeToMainApp: () => void;
}

const Tickets: React.FC<TicketsProps> = ({ closeToMainApp }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [choosenItem, setChoosenItem] = useState('Catégorie');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { t } = useTranslation();

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const sendTicket = async () => {
        try {
            const username = process.env.REACT_APP_REQUEST_USER;
            const password = process.env.REACT_APP_REQUEST_PASSWORD;
            const urlRequest =
                process.env.REACT_APP_BACKEND_URL + 'tickets/create';

            const userId = localStorage.getItem('userId');

            const response = await fetch(urlRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    author: userId,
                    title: title,
                    content: description,
                    date: new Date().toISOString(),
                    status: 0,
                    category: choosenItem,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send ticket');
            }

            console.log(response);
        } catch (error) {
            console.error('Error sending ticket:', error);
        }
    };

    const isAllField = () => {
        let allField = true;

        if (choosenItem === 'Catégorie') {
            allField = false;
        }
        if (title === '') {
            allField = false;
        }

        if (description === '') {
            allField = false;
        }
        if (allField === false) {
            alert('Veuillez remplir tous les champs');
        }
        return allField;
    }

    const handleSendTicket = async () => {
        if (isAllField()) {
            await sendTicket();
            closeToMainApp();
            alert('Le ticket a bien été envoyé');
        }
    };

    return (
        <TicketsContainer>
            <TicketsRectangle>
                <TicketsTitle>Envoyer un ticket</TicketsTitle>
                <CloseButton onClick={closeToMainApp} />

                <DropdownContainer onClick={handleDropdownToggle}>
                    {choosenItem}
                    {showDropdown && (
                        <>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Problème technique')
                                }
                            >
                                {t('technicalIssue')}
                            </DropdownItem>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Accès et Authentification')
                                }
                            >
                                {t('accessAndAuthentication')}
                            </DropdownItem>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Demande de Mise à Jour')
                                }
                            >
                                {t('updateRequest')}
                            </DropdownItem>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Feedback et Suggestions')
                                }
                            >
                                {t('feedbackAndSuggestions')}
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setChoosenItem('Autre')}
                            >
                                {t('others')}
                            </DropdownItem>
                        </>
                    )}
                </DropdownContainer>
                <TicketTitleInput
                    placeholder={t('ticketTitle')}
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                />
                <TicketDescriptionInput
                    placeholder={t('ticketDescription')}
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                />
                <SendButton onClick={handleSendTicket}>{t('send')}</SendButton>
            </TicketsRectangle>
        </TicketsContainer>
    );
};

export default Tickets;
