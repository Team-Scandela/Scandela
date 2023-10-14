import * as React from 'react';
import { ProfilMenuContainer, ProfileField, EditButton, Title } from './elements';

/** ProfilPannel of the main page Scandela
 * This ProfilPannel allows the user to see all their information about the city and the user
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
 **/

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
    const name = "Victor Harri-Chal";
    const email = "victor.harrichal@epitech.eu";
    const password = "scandevloppeur";
    const kwH = "600 kwh";

    return (
        <div>
            <ProfilMenuContainer isDark={isDark}>
                <Title>Responsable de la ville de : Nantes</Title>
                <ProfileField isDark={isDark}>
                    Nom: {name}
                    <EditButton isDark={isDark}>Modifier</EditButton>
                </ProfileField>
                <ProfileField isDark={isDark}>
                    Email: {email}
                    <EditButton isDark={isDark}>Modifier</EditButton>
                </ProfileField>
                <ProfileField isDark={isDark}>
                    Mot de passe: {password}
                    <EditButton isDark={isDark}>Modifier</EditButton>
                </ProfileField>
                <ProfileField isDark={isDark}>
                    kw/h de la ville: {kwH}
                    <EditButton isDark={isDark}>Modifier</EditButton>
                </ProfileField>
            </ProfilMenuContainer>
        </div>
    );
};

export default ProfilPannel;
