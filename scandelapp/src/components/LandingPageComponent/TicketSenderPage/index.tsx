import { useState } from 'react';
import {
    TicketSenderContainer,
    Title,
    DropdownContainer,
    DropdownItem,
    TicketTitleInput,
    TicketDescriptionInput,
    SendButton,
    ReturnButtonContainer,
} from './elements';
import { useTranslation } from 'react-i18next';

interface TicketSenderPageProps {
    handleTicketButtonClicked: () => void;
}

const TicketSender: React.FC<TicketSenderPageProps> = ({
    handleTicketButtonClicked,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [choosenItem, setChoosenItem] = useState('Catégorie');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { t } = useTranslation();

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleReturnButtonClicked = () => {
        handleTicketButtonClicked();
    };

    const sendTicket = async () => {
        console.log('send ticket')
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
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <TicketSenderContainer>
                <Title>{t('sendATicket')}</Title>
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
                    placeholder={t('ticketDescpription')}
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                />
                <SendButton onClick={sendTicket}>{t('send')}</SendButton>
                <ReturnButtonContainer onClick={handleReturnButtonClicked}>
                    Return
                </ReturnButtonContainer>
            </TicketSenderContainer>
        </div>
    );
};

export default TicketSender;
