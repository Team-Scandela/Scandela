import { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';

// css style for the admin page title
const titleStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '20px',
};

interface Ticket {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
    status: number;
}

/** Admin page of the app */
const Admin: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const getTicket = async () => {
        const username = 'tester';
        const password = 'T&st';
        const response = await fetch('http://db.scandela.store/tickets', {
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
