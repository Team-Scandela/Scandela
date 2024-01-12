import * as React from 'react';
import { ProfilePageContainer, ProfileField, EditButton, EditIcon, ValidateIcon, ReturnButtonContainer } from './elements';

/** Profile page component
 */

interface ProfilePageProps {
    handleProfileButtonClicked: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
    handleProfileButtonClicked,
}) => {
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [isEditingEmail, setIsEditingEmail] = React.useState(false);
    const [isEditingPassword, setIsEditingPassword] = React.useState(false);
    const [isEditingKwH, setIsEditingKwH] = React.useState(false);

    const [name, setName] = React.useState('Victor Harri-Chal');
    const [email, setEmail] = React.useState('victor.harrichal@epitech.eu');
    const [password, setPassword] = React.useState('scandevloppeur');
    const [kwH, setKwH] = React.useState('600');

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
                    Nom :{' '}
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
                    Email :{' '}
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
                    Mot de passe : {renderPasswordField()}
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
                    Kw/h de la ville :{' '}
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
            <ReturnButtonContainer onClick={handleReturnButtonClicked}>Return</ReturnButtonContainer>
        </div>
    );
};

export default ProfilePage;