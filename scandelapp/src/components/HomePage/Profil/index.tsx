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
    HelpText
} from './elements';
import { getUser, getUserByMail, putUser } from '../../../utils/userUtils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdminCard from './AdminCard';

interface ProfilProps {
    closeToMainApp: () => void;
}

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

    const [isUserNotFound, setIsUserNotFound] = useState(false);

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

    const updateUserAdminVille = async () => {
        if (admins.length <= 2)
            addAdministrator();
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
        const urlLamp =
            process.env.REACT_APP_BACKEND_URL + 'users';
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
                const admins = lampData.filter((user: any) => user.adminville === true);
                setAdmins(admins);
            }
        } catch (error) {
            console.log('CANNOT GET administrator, error message = ' + error);
        }
    };

    const addAdministrator = async () => {
        try {

            const urlRequest =
                process.env.REACT_APP_BACKEND_URL + `users/getByMail/${nameInput}`;
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
                    adminville: true,
                };
                console.log("UPDATED UserData = ", updatedUserData);
                const urlRequest =
                    process.env.REACT_APP_BACKEND_URL + 'users/' + userData.id;
                const response = await fetch(urlRequest, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
                    },
                    body: JSON.stringify(updatedUserData),
                });
                console.log("RESPONSE = ", response);
                //getAllAdministrator();
                setAdmins((prevAdmins) => [...prevAdmins, updatedUserData]);
                setIsAddAdmin(false);
            } else {
                setIsUserNotFound(true);
            }
        } catch (error) {
            setIsUserNotFound(true);
            console.log("Error remove administrator: ", error.message);
        }
    };


    const handleAddAdmin = () => {
        if (isAddAdmin == true)
            setIsAddAdmin(false);
        else
            setIsAddAdmin(true);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
        setIsUserNotFound(false);
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
                                style={{ width: '70%' }}
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
                                style={{ width: '70%' }}
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
                    {/* <ProfileField top={'35%'} left={'2.5%'}>
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
                    </ProfileField> */}
                    <LogoutButton onClick={handleLogout} />
                </ProfilPart>
                <ProfilPart left={'75%'}>
                    <SuperUserTitle>Panneau d'administrateur</SuperUserTitle>
                    <ButtonAddAdmin onClick={handleAddAdmin} />
                    <UsersList>
                        {!isAddAdmin && admins.length === 0 &&
                            <HelpText>
                                Cette fonctionnalité permet aux administrateurs de gérer l'accès des utilisateurs dans leur ville. Elle offre une interface complète pour visualiser, ajouter, et supprimer des utilisateurs tout en assurant des notifications et des confirmations pour chaque action.
                            </HelpText>
                        }
                        {!isAddAdmin && admins.map((user) => (
                            <UserCard key={user.id}>
                                {user && !isAddAdmin && (
                                    <>
                                        <AdminCard admin={user} setAdmins={setAdmins} />
                                    </>
                                )}
                            </UserCard>
                        ))}
                        {isAddAdmin && (
                            <>
                                <InputName
                                    value={nameInput}
                                    placeholder={'email'}
                                    onChange={handleOnChange}
                                    isError={isUserNotFound}
                                />
                                <ButtonSendAddAdmin
                                    onClick={updateUserAdminVille}
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
