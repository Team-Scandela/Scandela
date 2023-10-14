import * as React from 'react';
import { ProfilMenuContainer } from './elements';

/** ProfilPannel of the main page Scandela
 * This ProfilPannel allow the user to see all his information about the city and the user
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
    /** If the profil menu is open or closed */

    return (
        <div>
            <ProfilMenuContainer isDark={isDark}>
            </ProfilMenuContainer>
        </div>
    );
};

export default ProfilPannel;
