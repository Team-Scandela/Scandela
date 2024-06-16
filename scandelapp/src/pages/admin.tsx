import { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';

/** css style for the admin page title */
const titleStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '20px',
};

/** Ticket interface */
interface Ticket {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
    status: number;
}

/**
 * Admin page of the app
 * @component
 * @example
 * return (
 *   <Admin />
 * )
 */
const Admin: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    /**
     * Fetches tickets from the backend
     * @async
     */
    const getTicket = async () => {
        const username = process.env.REACT_APP_REQUEST_USER;
        const password = process.env.REACT_APP_REQUEST_PASSWORD;
        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'tickets';

        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        const tickets = await response.json();
        setTickets(tickets);
    };

    useEffect(() => {
        getTicket();
    }, []);

    return (
        <div style={{ backgroundColor: '#fff', height: '100vh' }}>
            <h1 style={titleStyle}>Administration : Ticket list</h1>
            <TicketList data={tickets} />
        </div>
    );
};

export default Admin;
