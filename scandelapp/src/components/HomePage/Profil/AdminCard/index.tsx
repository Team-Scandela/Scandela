import { useState, useEffect } from 'react';
import { getUserByMail, putUserWithId } from '../../../../utils/userUtils';

import {
    UserCardTitle,
    UserCardRights,
    UserCardEmail,
    UserCardDelete,
} from './elements';

interface Admin {
    id: string,
    town: string,
    email: string,
    username: string,
    password: string,
    rights: number,
    moreInformations: string,
    darkmode: boolean,
    lastConnexion: string,
    newsletter: boolean,
    premium: boolean,
    adminville: boolean,
};

interface AdminCardProps {
    admin: Admin,
    setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
};

const AdminCard: React.FC<AdminCardProps> = ({ admin, setAdmins}) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const passwordDb = process.env.REACT_APP_REQUEST_PASSWORD;

    const removeAdministrator = async () => {
        try {

            const urlRequest =
                process.env.REACT_APP_BACKEND_URL + `users/getByMail/${admin.email}`;
            const responseUser = await fetch(urlRequest, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                },
            });
            const userData = await responseUser.json();
            console.log("USERS By EMAIL = ", userData);
            if (userData) {
                const updatedUserData = {
                    id: userData.id,
                    town: userData.town,
                    email: userData.email,
                    username: userData.username,
                    password: userData.password,
                    rights: userData.rights,
                    moreInformations: userData.moreInformations,
                    darkmode: userData.darkmode,
                    lastConnexion: userData.lastConnexion,
                    newsletter: userData.newsletter,
                    premium: userData.premium,
                    adminville: false,
                };
                console.log("UPDATED UserData = ", updatedUserData);
                const urlRequest =
                    process.env.REACT_APP_BACKEND_URL + 'users/' + admin.id;
                const response = await fetch(urlRequest, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                    },
                    body: JSON.stringify(updatedUserData),
                });
                console.log("RESPONSE = ", response);
                setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== admin.id));
            }
        } catch (error) {
            console.log("Error remove administrator: ", error.message);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <UserCardTitle>
                {admin.username}
            </UserCardTitle>
            <UserCardRights>
                {'Droits : ' + 'Adminnistrateur'}
            </UserCardRights>
            <UserCardEmail>
                {admin.email}
            </UserCardEmail>
            <UserCardDelete
                onClick={removeAdministrator}
            />
        </>
    );
};

export default AdminCard;