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

const TicketSender: React.FC<TicketSenderProps> = ({isDark }) => {

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [choosenItem, setChoosenItem] = React.useState('Catégorie');

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const sendTicket = async () => {
        try {
            const response = await fetch('http://localhost:8080/tickets/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // author: 'le_nom_de_l_auteur',  // Remplacez par le nom de l'auteur réel
                    // title: title,
                    // content: 'le_contenu_du_ticket',  // Remplacez par le contenu réel du ticket
                    // date: new Date().toISOString(),  // Remplacez par la date réelle
                    // status: 1,  // Remplacez par le statut réel
                    // category: chosenItem,
                }),
            });
    };

    const getTicket = async () => {
        const response = await fetch('http://localhost:8080/tickets');
        const tickets = await response.json();
        console.log(tickets);
    }



    return (
        <div>
            <TicketSenderContainer isDark={isDark}>
                <Title isDark={isDark}>Envoyer un ticket</Title>
                <DropdownContainer isDark={isDark} onClick={handleDropdownToggle}>
                    {choosenItem}
                    {showDropdown && (
                        <>
                        <DropdownItem onClick={() =>setChoosenItem("Problème technique")}>Problème technique</DropdownItem>
                        <DropdownItem onClick={() =>setChoosenItem("Accès et Authentification")}>Accès et Authentification</DropdownItem>
                        <DropdownItem onClick={() =>setChoosenItem("Demande de Mise à Jour")}>Demande de Mise à Jour</DropdownItem>
                        <DropdownItem onClick={() =>setChoosenItem("Feedback et Suggestions")}>Feedback et Suggestions</DropdownItem>
                        <DropdownItem onClick={() =>setChoosenItem("Autre")}>Autre</DropdownItem>
                        </>
                    )}
                </DropdownContainer>
                <TicketTitleInput isDark={isDark} placeholder="Titre du ticket"></TicketTitleInput>
                <TicketDescriptionInput isDark={isDark} placeholder="Description du ticket"></TicketDescriptionInput>
                <SendButton isDark={isDark} onClick={sendTicket} >Envoyer</SendButton>
            </TicketSenderContainer>
        </div>

    );
};

export default TicketSender;
