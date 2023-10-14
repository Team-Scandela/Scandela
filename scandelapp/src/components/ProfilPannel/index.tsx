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
    return (
        <div>
            <ProfilMenuContainer isDark={isDark}>
              <Title>Responsable de la ville de : Nantes</Title>
              <ProfileField isDark={isDark}>
                  <span>Nom:</span>
                  <EditButton isDark={isDark}>Modifier</EditButton>
              </ProfileField>
              <ProfileField isDark={isDark}>
                  <span>Email:</span>
                  <EditButton isDark={isDark}>Modifier</EditButton>
              </ProfileField>
              <ProfileField isDark={isDark}>
                  <span>Password:</span>
                  <EditButton isDark={isDark}>Modifier</EditButton>
              </ProfileField>
              <ProfileField isDark={isDark}>
                  <span>kw/h de la ville:</span>
                  <EditButton isDark={isDark}>Modifier</EditButton>
              </ProfileField>
            </ProfilMenuContainer>
        </div>
    );
};

export default ProfilPannel;
