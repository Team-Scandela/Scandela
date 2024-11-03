import {useState, useEffect} from 'react';

interface AdminListProps {
    isDark: boolean
}

const AdminList: React.FC<AdminListProps> = ({isDark}) => {
    const [admins, setAdmins] = useState<any[]>([]);
    const username = process.env.REACT_APP_REQUEST_USER;
    const passwordDb = process.env.REACT_APP_REQUEST_PASSWORD;
    
    const getAllAdministrator = async () => {
        const urlLamp =
            process.env.REACT_APP_BACKEND_URL + 'adminville';
        try {
            const response = await fetch(urlLamp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                },
            });

            console.log('code de response = ' + response.status);
            const lampData = await response.json();
            console.log(lampData);
            if (response.status === 200) {
                setAdmins(lampData);
                console.log('SUCCES TO GET administrator, status = ', response.status, " ADMIN[]= ", admins);
            }
        } catch (error) {
            console.log('CANNOT GET administrator, error message = ' + error);
        }
    }

    useEffect(() => {
        getAllAdministrator();
    }, []);

    return (
        <>
        </>
    );
};