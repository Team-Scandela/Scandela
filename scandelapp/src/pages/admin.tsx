import * as React from 'react';
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
    const [tickets, setTickets] = React.useState<Ticket[]>([]);

    const getTicket = async () => {
        const response = await fetch('http://localhost:8080/tickets');
        const tickets = await response.json();
        setTickets(tickets);
    };

    React.useEffect(() => {
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
