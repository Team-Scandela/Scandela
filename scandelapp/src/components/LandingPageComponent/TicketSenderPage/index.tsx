import React from 'react';
import {
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

const TicketSenderPage: React.FC<TicketSenderPageProps> = ({
    handleTicketButtonClicked,
}) => {

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [choosenItem, setChoosenItem] = React.useState('Catégorie');

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleReturnButtonClicked = () => {
        handleTicketButtonClicked();
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
        } catch {}
    };

    const getTicket = async () => {
        const response = await fetch('http://localhost:8080/tickets');
        const tickets = await response.json();
        console.log(tickets);
    }

    return (
        <div>
                <Title>Envoyer un ticket</Title>
                <DropdownContainer onClick={handleDropdownToggle}>
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
                <TicketTitleInput placeholder="Titre du ticket"></TicketTitleInput>
                <TicketDescriptionInput placeholder="Description du ticket"></TicketDescriptionInput>
                <SendButton onClick={sendTicket} >Envoyer</SendButton>
            <ReturnButtonContainer onClick={handleReturnButtonClicked}>Return</ReturnButtonContainer>
        </div>

    );
};

export default TicketSenderPage;
