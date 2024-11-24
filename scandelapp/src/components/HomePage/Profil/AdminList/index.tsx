import { useState, useEffect } from 'react';

interface AdminListProps {
    isDark: boolean;
}

const AdminList: React.FC<AdminListProps> = ({ isDark }) => {
    const [admins, setAdmins] = useState<any[]>([]);
    const username = process.env.REACT_APP_REQUEST_USER;
    const passwordDb = process.env.REACT_APP_REQUEST_PASSWORD;

    const getAllAdministrator = async () => {
        const urlLamp = process.env.REACT_APP_BACKEND_URL + 'users';
        try {
            const response = await fetch(urlLamp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                },
            });

            const lampData = await response.json();
            if (response.status === 200) {
                const admins = lampData.filter(
                    (user: any) => user.adminville === true
                );
                setAdmins(admins);
            }
        } catch (error) {
            console.log('CANNOT GET administrator, error message = ' + error);
        }
    };

    const removeAdministrator = async () => {
        try {
        } catch {}
    };

    useEffect(() => {
        getAllAdministrator();
    }, []);

    return <></>;
};
