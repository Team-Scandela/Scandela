import * as React from 'react';
import {
    SettingsButtonContainer,
    NameOfCity,
    OptionsMenuContainer,
    LogoutButton,
    ProfileButton,
    LanguageButton,
} from './element';
import LightDark from '../LightDark';
import { useTranslation } from 'react-i18next';
import Login from '../../pages/login';
import { useNavigate } from 'react-router-dom';

/** SettingsButton of the main page Scandela
 * This SettingsButton allow the user to disconnect from his account and to switch le lightmod
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
 **/

interface SettingsButtonProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
    id,
    isDark,
    setIsDark,
}) => {
    /** If the option menu is open or closed */
    const navigate = useNavigate();
    const [on, setOn] = React.useState(false);

    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div>
            <SettingsButtonContainer isDark={isDark} onClick={() => setOn(!on)}>
                <NameOfCity isDark={isDark}> Nantes </NameOfCity>
            </SettingsButtonContainer>
            <OptionsMenuContainer show={on} isDark={isDark}>
                <ProfileButton></ProfileButton>
                <LightDark
                    id={'lightDarkComponentId'}
                    isDark={isDark}
                    setIsDark={setIsDark}
                ></LightDark>
                <LanguageButton
                    onClick={() => changeLanguage('en')}
                ></LanguageButton>
                <LogoutButton onClick={handleLogout}></LogoutButton>
            </OptionsMenuContainer>
        </div>
    );
};

export default SettingsButton;
