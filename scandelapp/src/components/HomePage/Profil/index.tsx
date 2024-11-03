import { useEffect, useState } from 'react';
import {
    ProfilContainer,
    ProfilRectangle,
    CloseButton,
    ProfilTitle,
    ProfileField,
    EditButton,
    EditIcon,
    ValidateIcon,
    ProfilPart,
    SuperUserTitle,
    UsersList,
    UserCard,
    UserCardTitle,
    UserCardRights,
    UserCardEmail,
    UserCardDelete,
    UserCardUpgrade,
    LogoutButton,
    ButtonAddAdmin,
    InputName,
    ButtonSendAddAdmin,
} from './elements';
import { getUser, putUser } from '../../../utils/userUtils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ProfilProps {
    closeToMainApp: () => void;
}

const users = [
    {
        username: 'John Doe',
        email: 'john.doe@nantesmairie.fr',
        right: 'Administrateur',
    },
    {
        username: 'Patrick Dupont',
        email: 'patrick.dupont@nantesmairie.fr',
        right: 'Utilisateur',
    },
    {
        username: 'Jeanne Martin',
        email: 'jeanne.martin@bouayemairie.fr',
        right: 'Utilisateur',
    },
];

const Profil: React.FC<ProfilProps> = ({ closeToMainApp }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingKwH, setIsEditingKwH] = useState(false);

    const [name, setName] = useState('Chargement...');
    const [email, setEmail] = useState('Chargement...');
    const [password, setPassword] = useState('');
    const [kwH, setKwH] = useState('600');

    const [admins, setAdmins] = useState<any[]>([]);
    const [isAddAdmin, setIsAddAdmin] = useState(false);

    const username = process.env.REACT_APP_REQUEST_USER;
    const passwordDb = process.env.REACT_APP_REQUEST_PASSWORD;
    const [isWaiting, setIsWaiting] = useState(false);
    const [nameInput, setNameInput] = useState('');

    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUser();
            if (user) {
                setName(user.username);
                setEmail(user.email);
            }
        };

        fetchUserData();
        getAllAdministrator();
    }, []);

    const handleEditClick = (field: string) => {
        switch (field) {
            case 'name':
                setIsEditingName(true);
                break;
            case 'email':
                setIsEditingEmail(true);
                break;
            case 'password':
                setIsEditingPassword(true);
                break;
            case 'kwH':
                setIsEditingKwH(true);
                break;
            default:
                break;
        }
    };

    const handleSaveClick = (field: string) => {
        switch (field) {
            case 'name':
                if (name.length === 0) {
                    alert(
                        'Vous ne pouvez pas remplacer votre nom par un texte vide.'
                    );
                    return;
                }
                updateUserName();
                setIsEditingName(false);
                break;
            case 'email':
                if (email.length === 0) {
                    alert(
                        'Vous ne pouvez pas remplacer votre email par un texte vide.'
                    );
                    return;
                }
                updateUserEmail();
                setIsEditingEmail(false);
                break;
            case 'password':
                if (password.length <= 8) {
                    alert(
                        'Votre mot de passe doit contenir au moins 8 caractères.'
                    );
                    return;
                }
                setIsEditingPassword(false);
                break;
            case 'kwH':
                if (kwH.length === 0) {
                    alert(
                        'Vous ne pouvez pas remplacer votre consommation par un texte vide.'
                    );
                    return;
                }
                setIsEditingKwH(false);
                break;
            default:
                break;
        }
    };

    const renderPasswordField = () => {
        if (isEditingPassword) {
            return (
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            );
        } else {
            return <span>{'*'.repeat(password.length)}</span>;
        }
    };

    const updateUserName = async () => {
        const user = await getUser();
        const updatedUserData = {
            town: user.town,
            email: user.email,
            username: name,
            password: user.password,
            rights: user.rights,
            moreInformations: user.moreInformations,
            darkmode: user.darkmode,
            lastConnexion: user.lastConnexion,
            newsletter: user.newsletter,
            premium: user.premium,
        };
        putUser(updatedUserData);
    };

    const updateUserEmail = async () => {
        const user = await getUser();
        const updatedUserData = {
            town: user.town,
            email: email,
            username: user.username,
            password: user.password,
            rights: user.rights,
            moreInformations: user.moreInformations,
            darkmode: user.darkmode,
            lastConnexion: user.lastConnexion,
            newsletter: user.newsletter,
            premium: user.premium,
        };
        putUser(updatedUserData);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const getAllAdministrator = async () => {
        const urlLamp = process.env.REACT_APP_BACKEND_URL + 'adminville';
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
                console.log(
                    'SUCCES TO GET administrator, status = ',
                    response.status,
                    ' ADMIN[]= ',
                    admins
                );
            } else {
                console.log(
                    'CANNOT GET administrator, status = ' + response.status
                );
            }
        } catch (error) {
            console.log('CANNOT GET administrator, error message = ' + error);
        }
    };

    const addAdministrator = async () => {
        const urlmodification =
            process.env.REACT_APP_BACKEND_URL +
            'adminville/' +
            'd3832413-2340-4942-b15a-6449d914b0f1/' +
            '4dcb1058-f221-40c2-8059-78c33d778e77';
        try {
            const response = await fetch(urlmodification, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                },
                body: JSON.stringify({
                    name: name,
                }),
            });
            const responsebody = await response.text();
            console.log(responsebody);
            if (response.status === 200) {
                console.log(
                    'MODIFICATION APPLIED, status code: ' + response.status
                );
                setIsAddAdmin(false);
            } else {
                console.log(
                    'FAIL TO APPLY MODIFICATION, status code: ' +
                        response.status
                );
                setIsWaiting(false);
                setIsAddAdmin(false);
            }
        } catch (error) {
            console.log(
                'FAIL TO APPLY MODIFICATION, error message: ' + error.message
            );
            setIsWaiting(false);
        }
    };

    const removeAdministrator = async () => {
        const urlmodification =
            process.env.REACT_APP_BACKEND_URL +
            'adminville/' +
            'd3832413-2340-4942-b15a-6449d914b0f1/' +
            '4dcb1058-f221-40c2-8059-78c33d778e77';
        try {
            const response = await fetch(urlmodification, {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                },
            });
            const responsebody = await response.text();
            console.log(responsebody);
            if (response.status === 200) {
                console.log(
                    'MODIFICATION APPLIED, status code: ' + response.status
                );
            } else {
                console.log(
                    'FAIL TO APPLY MODIFICATION, status code: ' +
                        response.status
                );
                setIsWaiting(false);
            }
        } catch (error) {
            console.log(
                'FAIL TO APPLY MODIFICATION, error message: ' + error.message
            );
            setIsWaiting(false);
        }
    };

    const handleAddAdmin = () => {
        setIsAddAdmin(true);
        console.log('Unlock input');
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };

    return (
        <ProfilContainer>
            <ProfilRectangle>
                <CloseButton onClick={closeToMainApp} />
                <ProfilTitle>
                    Modifier vos informations personnelles
                </ProfilTitle>
                <ProfilPart left={'25%'}>
                    <ProfileField top={'5%'} left={'2.5%'}>
                        {t('name')} :{' '}
                        {isEditingName ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        ) : (
                            name
                        )}
                        {isEditingName ? (
                            <EditButton onClick={() => handleSaveClick('name')}>
                                <ValidateIcon></ValidateIcon>
                            </EditButton>
                        ) : (
                            <EditButton onClick={() => handleEditClick('name')}>
                                <EditIcon></EditIcon>
                            </EditButton>
                        )}
                    </ProfileField>
                    <ProfileField top={'15%'} left={'2.5%'}>
                        {t('email')} :{' '}
                        {isEditingEmail ? (
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        ) : (
                            email
                        )}
                        {isEditingEmail ? (
                            <EditButton
                                onClick={() => handleSaveClick('email')}
                            >
                                <ValidateIcon></ValidateIcon>
                            </EditButton>
                        ) : (
                            <EditButton
                                onClick={() => handleEditClick('email')}
                            >
                                <EditIcon></EditIcon>
                            </EditButton>
                        )}
                    </ProfileField>
                    <ProfileField top={'25%'} left={'2.5%'}>
                        {t('password')} : {renderPasswordField()}
                        {isEditingPassword ? (
                            <EditButton
                                onClick={() => handleSaveClick('password')}
                            >
                                <ValidateIcon></ValidateIcon>
                            </EditButton>
                        ) : (
                            <EditButton
                                onClick={() => handleEditClick('password')}
                            >
                                <EditIcon></EditIcon>
                            </EditButton>
                        )}
                    </ProfileField>
                    <ProfileField top={'35%'} left={'2.5%'}>
                        {t('KWhOfTheCity')} :{' '}
                        {isEditingKwH ? (
                            <input
                                type="text"
                                value={kwH}
                                onChange={(e) => setKwH(e.target.value)}
                            />
                        ) : (
                            kwH
                        )}{' '}
                        kwH
                        {isEditingKwH ? (
                            <EditButton onClick={() => handleSaveClick('kwH')}>
                                <ValidateIcon></ValidateIcon>
                            </EditButton>
                        ) : (
                            <EditButton onClick={() => handleEditClick('kwH')}>
                                <EditIcon></EditIcon>
                            </EditButton>
                        )}
                    </ProfileField>
                    <LogoutButton onClick={handleLogout} />
                </ProfilPart>
                <ProfilPart left={'75%'}>
                    <SuperUserTitle>Panneau d'administrateur</SuperUserTitle>
                    <ButtonAddAdmin onClick={handleAddAdmin} />
                    <UsersList>
                        {admins.map((user) => (
                            <UserCard>
                                {user && (
                                    <>
                                        <UserCardTitle>
                                            {user.username}
                                        </UserCardTitle>
                                        <UserCardRights>
                                            {'Droits : ' + user.right}
                                        </UserCardRights>
                                        <UserCardEmail>
                                            {user.email}
                                        </UserCardEmail>
                                        {user.right !== 'Administrateur' ? (
                                            <UserCardDelete
                                                onClick={removeAdministrator}
                                            />
                                        ) : null}
                                        {user.right !== 'Administrateur' ? (
                                            <UserCardUpgrade />
                                        ) : null}
                                    </>
                                )}
                            </UserCard>
                        ))}
                        {isAddAdmin && (
                            <>
                                <InputName
                                    value={nameInput}
                                    placeholder={'name'}
                                    onChange={handleOnChange}
                                />
                                <ButtonSendAddAdmin
                                    onClick={addAdministrator}
                                />
                            </>
                        )}
                    </UsersList>
                </ProfilPart>
            </ProfilRectangle>
        </ProfilContainer>
    );
};

export default Profil;
