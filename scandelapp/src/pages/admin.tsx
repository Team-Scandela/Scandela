import * as React from 'react';
import TicketList from '../components/TicketList';

// css style for the admin page title
const titleStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '20px',
};

/** Admin page of the app */
const Admin: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#fff', height: '100vh' }}>
            <h1 style={titleStyle}>Administration : Ticket list</h1>
            <TicketList />
        </div>
    );
};

export default Admin;
