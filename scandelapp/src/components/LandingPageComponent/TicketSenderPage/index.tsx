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

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleReturnButtonClicked = () => {
        handleTicketButtonClicked();
    };

    const sendTicket = async () => {
        try {
            const username = 'tester';
            const password = 'T&st';
            const response = await fetch(
                'https://serverdela.onrender.com/tickets/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(
                            `${username}:${password}`
                        )}`,
                    },
                    body: JSON.stringify({
                        author: '',
                        title: title,
                        content: description,
                        date: new Date().toISOString(),
                        status: 0,
                        category: choosenItem,
                    }),
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getTicket = async () => {
        const response = await fetch('https://serverdela.onrender.com/tickets');
        const tickets = await response.json();
        console.log(tickets);
    };

    return (
        <div>
            <TicketSenderContainer>
                <Title>Envoyer un ticket</Title>
                <DropdownContainer onClick={handleDropdownToggle}>
                    {choosenItem}
                    {showDropdown && (
                        <>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Problème technique')
                                }
                            >
                                Problème technique
                            </DropdownItem>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Accès et Authentification')
                                }
                            >
                                Accès et Authentification
                            </DropdownItem>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Demande de Mise à Jour')
                                }
                            >
                                Demande de Mise à Jour
                            </DropdownItem>
                            <DropdownItem
                                onClick={() =>
                                    setChoosenItem('Feedback et Suggestions')
                                }
                            >
                                Feedback et Suggestions
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setChoosenItem('Autre')}
                            >
                                Autre
                            </DropdownItem>
                        </>
                    )}
                </DropdownContainer>
                <TicketTitleInput
                    placeholder="Titre du ticket"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                />
                <TicketDescriptionInput
                    placeholder="Description du ticket"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                />
                <SendButton onClick={sendTicket}>Envoyer</SendButton>
                <ReturnButtonContainer onClick={handleReturnButtonClicked}>
                    Return
                </ReturnButtonContainer>
            </TicketSenderContainer>
        </div>
    );
};

export default TicketSender;
