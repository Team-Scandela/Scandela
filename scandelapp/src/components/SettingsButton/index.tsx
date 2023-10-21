import * as React from 'react';
import {
    SettingsButtonContainer,
    NameOfCity,
    OptionsMenuContainer,
    LogoutButton,
    ProfileButton,
    LanguageButton,
    DownloadButton,
} from './elements';
import LightDark from '../LightDark';
import ProfilPannel from '../ProfilPannel';
import { useTranslation } from 'react-i18next';
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
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [on, setOn] = React.useState(false);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    function launchScript(argument: string) {
        fetch(`http://localhost:3001/script`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ argument }),
        }).then((response) => response.text());
    }

    const downloadData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0], 'UTF-8');
            reader.onload = (evt) => {
                if (evt.target) {
                    const fileContent = evt.target.result;
                    launchScript(fileContent as string);
                }
            };
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSettingsMenu = () => {
        setOn(!on);
        if (on === true) setIsProfileOpen(false);
    };

    const handleProfileButtonClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div>
            <SettingsButtonContainer
                isDark={isDark}
                onClick={handleSettingsMenu}
            >
                <NameOfCity isDark={isDark}> Nantes </NameOfCity>
            </SettingsButtonContainer>
            <OptionsMenuContainer show={on} isDark={isDark}>
                <ProfileButton
                    onClick={handleProfileButtonClick}
                ></ProfileButton>
                <LightDark
                    id={'lightDarkComponentId'}
                    isDark={isDark}
                    setIsDark={setIsDark}
                ></LightDark>
                <LanguageButton
                    onClick={() => changeLanguage('en')}
                ></LanguageButton>
                <DownloadButton
                    onClick={() => openFilePicker()}
                ></DownloadButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={downloadData}
                />
                <LogoutButton onClick={handleLogout}></LogoutButton>
            </OptionsMenuContainer>
            {isProfileOpen && (
                <ProfilPannel
                    id={'yourId'}
                    isDark={isDark}
                    setIsDark={setIsDark}
                />
            )}
        </div>
    );
};

export default SettingsButton;
