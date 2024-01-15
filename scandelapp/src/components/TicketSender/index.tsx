import React from 'react';
import {
    TicketSenderContainer,
    Title,
    DropdownContainer,
    DropdownItem,
    TicketTitleInput,
    TicketDescriptionInput,
    SendButton,
} from './elements';

interface TicketSenderProps {
    isDark: boolean; // A flag to determine if it's in dark mode
}

const TicketSender: React.FC<TicketSenderProps> = ({ isDark }) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [choosenItem, setChoosenItem] = React.useState('Catégorie');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const sendTicket = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/tickets/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
        const response = await fetch('http://localhost:8080/tickets');
        const tickets = await response.json();
        console.log(tickets);
    };

    return (
        <div>
            <TicketSenderContainer isDark={isDark}>
                <Title isDark={isDark}>Envoyer un ticket</Title>
                <DropdownContainer
                    isDark={isDark}
                    onClick={handleDropdownToggle}
                >
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
                    isDark={isDark}
                    placeholder="Titre du ticket"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                />
                <TicketDescriptionInput
                    isDark={isDark}
                    placeholder="Description du ticket"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                />
                <SendButton isDark={isDark} onClick={sendTicket}>
                    Envoyer
                </SendButton>
            </TicketSenderContainer>
        </div>
    );
};

export default TicketSender;
