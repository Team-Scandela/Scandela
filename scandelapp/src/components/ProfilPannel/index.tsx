import * as React from 'react';
import { ProfilMenuContainer, ProfileField, EditButton, Title } from './elements';

interface ProfilPannelProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const ProfilPannel: React.FC<ProfilPannelProps> = ({
    id,
    isDark,
    setIsDark,
}) => {
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [isEditingEmail, setIsEditingEmail] = React.useState(false);
    const [isEditingPassword, setIsEditingPassword] = React.useState(false);
    const [isEditingKwH, setIsEditingKwH] = React.useState(false);

    const [name, setName] = React.useState("Victor Harri-Chal");
    const [email, setEmail] = React.useState("victor.harrichal@epitech.eu");
    const [password, setPassword] = React.useState("scandevloppeur");
    const [kwH, setKwH] = React.useState("600");

    const handleEditClick = (field: string) => {
        switch (field) {
            case "name":
                setIsEditingName(true);
                break;
            case "email":
                setIsEditingEmail(true);
                break;
            case "password":
                setIsEditingPassword(true);
                break;
            case "kwH":
                setIsEditingKwH(true);
                break;
            default:
                break;
        }
    }

    const handleSaveClick = (field: string) => {
        switch (field) {
            case "name":
                setIsEditingName(false);
                break;
            case "email":
                setIsEditingEmail(false);
                break;
            case "password":
                setIsEditingPassword(false);
                break;
            case "kwH":
                setIsEditingKwH(false);
                break;
            default:
                break;
        }
    }

    const renderPasswordField = () => {
        if (isEditingPassword) {
            return (
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            );
        } else {
            return (
                <span>{'*'.repeat(password.length)}</span>
            );
        }
    }

    return (
        <div>
            <ProfilMenuContainer isDark={isDark}>
                <Title>Profil</Title>
                <ProfileField isDark={isDark}>
                    Nom : {isEditingName ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        name
                    )}
                    {isEditingName ? (
                        <EditButton isDark={isDark} onClick={() => handleSaveClick("name")}>
                            Enregistrer
                        </EditButton>
                    ) : (
                        <EditButton isDark={isDark} onClick={() => handleEditClick("name")}>
                            Modifier
                        </EditButton>
                    )}
                </ProfileField>
                <ProfileField isDark={isDark}>
                    Email : {isEditingEmail ? (
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ) : (
                        email
                    )}
                    {isEditingEmail ? (
                        <EditButton isDark={isDark} onClick={() => handleSaveClick("email")}>
                            Enregistrer
                        </EditButton>
                    ) : (
                        <EditButton isDark={isDark} onClick={() => handleEditClick("email")}>
                            Modifier
                        </EditButton>
                    )}
                </ProfileField>
                <ProfileField isDark={isDark}>
                    Mot de passe : {renderPasswordField()}
                    {isEditingPassword ? (
                        <EditButton isDark={isDark} onClick={() => handleSaveClick("password")}>
                            Enregistrer
                        </EditButton>
                    ) : (
                        <EditButton isDark={isDark} onClick={() => handleEditClick("password")}>
                            Modifier
                        </EditButton>
                    )}
                </ProfileField>
                <ProfileField isDark={isDark}>
                    Kw/h de la ville : {isEditingKwH ? (
                        <input
                            type="text"
                            value={kwH}
                            onChange={(e) => setKwH(e.target.value)}
                        />
                    ) : (
                        kwH
                    )}
                    {' '}kwH
                    {isEditingKwH ? (
                        <EditButton isDark={isDark} onClick={() => handleSaveClick("kwH")}>
                            Enregistrer
                        </EditButton>
                    ) : (
                        <EditButton isDark={isDark} onClick={() => handleEditClick("kwH")}>
                            Modifier
                        </EditButton>
                    )}
                </ProfileField>
            </ProfilMenuContainer>
        </div>
    );
};

export default ProfilPannel;
