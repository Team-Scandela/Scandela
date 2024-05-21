import { useState, useEffect } from 'react';
import {
    TicketListContainer,
    TicketContainer,
    TicketInfoContainer,
    TicketHeader,
    TicketTitle,
    TicketCategory,
    TicketDescription,
    TicketDate,
    TicketClient,
    TicketStatusDropdown,
    TicketStatusItem,
} from './elements';
import { CgProfile } from 'react-icons/cg';

interface Ticket {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
    status: number;
}

interface TicketListProps {
    data: Ticket[];
}

const TicketListData = [
    {
        id: 1,
        title: 'Problème de connexion',
        description: "Je n'arrive pas à me connecter à l'application",
        category: 'Accès et Authentification',
        date: '2021-06-02T09:00:00.000Z',
        status: 0,
        user: {
            id: 1,
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jeandupont@gmail.com',
        },
    },
    {
        id: 2,
        title: 'Carte interactive ne fonctionne pas',
        description: "La carte interactive ne s'affiche pas",
        category: 'Problème technique',
        date: '2021-06-02T09:00:00.000Z',
        status: 2,
        user: {
            id: 1,
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jeandupont@gmail.com',
        },
    },
    {
        id: 3,
        title: 'Carte interactive ne fonctionne pas',
        description: "La carte interactive ne s'affiche pas",
        category: 'Problème technique',
        date: '2021-06-02T09:00:00.000Z',
        status: 1,
        user: {
            id: 1,
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jeandupont@gmail.com',
        },
    },
];

const TicketList: React.FC<TicketListProps> = ({ data }) => {
    const [tickets, setTickets] = useState(data);
    const [showDropdown, setShowDropdown] = useState(-1);

    useEffect(() => {
        setTickets(data);
    }, [data]);

    const getStatusText = (status: number) => {
        switch (status) {
            case 0:
                return 'En attente';
            case 1:
                return 'En cours';
            case 2:
                return 'Résolu';
            default:
                return 'En attente';
        }
    };

    const getStatusColor = (status: number) => {
        switch (status) {
            case 0:
                return '#ff0000';
            case 1:
                return '#FF8C00';
            case 2:
                return '#00FF00';
            default:
                return '#ff0000';
        }
    };

    const setStatus = (status: number, ticketId: number) => {
        setTickets((prevTickets) => {
            const updatedTickets = prevTickets.map((ticket) => {
                if (ticket.id === ticketId) {
                    updateStatusInDB(ticketId, status);
                    return { ...ticket, status: status };
                }
                return ticket;
            });
            return updatedTickets;
        });
        setShowDropdown(-1);
    };

    const updateStatusInDB = async (ticketId: number, status: number) => {
        // try {
        // const urlRequest = process.env.REACT_APP_BACKEND_URL + 'tickets/update';
        //     const response = await fetch(urlRequest, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: ticketId,
        //             status: status,
        //         }),
        //     });
        // } catch (error) {
        //     console.log(error);
        // };
    };

    // timestamp to date
    const timestampToDate = (timestamp: string) => {
        if (!timestamp) return '';
        const dateString =
            timestamp[2] + '/' + timestamp[1] + '/' + timestamp[0];
        return dateString;
    };

    return (
        <TicketListContainer>
            {tickets.map((ticket) => (
                <TicketContainer key={ticket.id}>
                    <TicketHeader>
                        <TicketTitle>{ticket.title}</TicketTitle>
                        <TicketCategory>{ticket.category}</TicketCategory>
                    </TicketHeader>
                    <TicketInfoContainer color={getStatusColor(ticket.status)}>
                        <TicketDescription>{ticket.content}</TicketDescription>
                        <TicketDate>{timestampToDate(ticket.date)}</TicketDate>
                        <TicketClient>
                            {' '}
                            <CgProfile />{' '}
                        </TicketClient>
                        <TicketStatusDropdown
                            onClick={() =>
                                showDropdown !== ticket.id &&
                                setShowDropdown(ticket.id)
                            }
                        >
                            {getStatusText(ticket.status)}
                            {showDropdown === ticket.id && (
                                <>
                                    <TicketStatusItem
                                        onClick={() => setStatus(0, ticket.id)}
                                    >
                                        {getStatusText(0)}
                                    </TicketStatusItem>
                                    <TicketStatusItem
                                        onClick={() => setStatus(1, ticket.id)}
                                    >
                                        {getStatusText(1)}
                                    </TicketStatusItem>
                                    <TicketStatusItem
                                        onClick={() => setStatus(2, ticket.id)}
                                    >
                                        {getStatusText(2)}
                                    </TicketStatusItem>
                                </>
                            )}
                        </TicketStatusDropdown>
                    </TicketInfoContainer>
                </TicketContainer>
            ))}
        </TicketListContainer>
    );
};

export default TicketList;
