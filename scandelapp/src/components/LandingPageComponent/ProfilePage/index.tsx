import { useState, useEffect } from 'react';
import {
    ProfilePageContainer,
    ProfileField,
    EditButton,
    EditIcon,
    ValidateIcon,
    ReturnButtonContainer,
} from './elements';
import { getUser } from '../../../utils/userUtils';
import { useTranslation } from 'react-i18next';

/** Profile page component
 */

interface ProfilePageProps {
    handleProfileButtonClicked: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
    handleProfileButtonClicked,
}) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingKwH, setIsEditingKwH] = useState(false);

    const [name, setName] = useState('Chargement...');
    const [email, setEmail] = useState('Chargement...');
    const [password, setPassword] = useState('');
    const [kwH, setKwH] = useState('600');

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
    }, []);

    const handleReturnButtonClicked = () => {
        handleProfileButtonClicked();
    };

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
                setIsEditingName(false);
                break;
            case 'email':
                setIsEditingEmail(false);
                break;
            case 'password':
                setIsEditingPassword(false);
                break;
            case 'kwH':
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

    return (
        <div>
            <ProfilePageContainer>
                <ProfileField top={'7%'}>
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
                <ProfileField top={'17%'}>
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
                        <EditButton onClick={() => handleSaveClick('email')}>
                            <ValidateIcon></ValidateIcon>
                        </EditButton>
                    ) : (
                        <EditButton onClick={() => handleEditClick('email')}>
                            <EditIcon></EditIcon>
                        </EditButton>
                    )}
                </ProfileField>
                <ProfileField top={'27%'}>
                    {t('password')} : {renderPasswordField()}
                    {isEditingPassword ? (
                        <EditButton onClick={() => handleSaveClick('password')}>
                            <ValidateIcon></ValidateIcon>
                        </EditButton>
                    ) : (
                        <EditButton onClick={() => handleEditClick('password')}>
                            <EditIcon></EditIcon>
                        </EditButton>
                    )}
                </ProfileField>
                <ProfileField top={'37%'}>
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
            </ProfilePageContainer>
            <ReturnButtonContainer onClick={handleReturnButtonClicked}>
                Return
            </ReturnButtonContainer>
        </div>
    );
};

export default ProfilePage;
