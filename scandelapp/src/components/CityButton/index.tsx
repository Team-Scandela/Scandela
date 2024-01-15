import * as React from 'react';
import {
    SettingsButtonContainer,
    NameOfCity,
    OptionsMenuContainer,
    LanguageButton,
    DownloadButton,
} from './elements';
import LightDark from '../LightDark';
import { useTranslation } from 'react-i18next';

/** City button of the main page Scandela
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface CityButtonProps {
    id: string;
    isDark: boolean;
}

const CityButton: React.FC<CityButtonProps> = ({ id, isDark }) => {
    /** If the option menu is open or closed */
    const [on, setOn] = React.useState(false);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    function launchScript(argument: string) {
        fetch(`http://db.scandela.fr/script`, {
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
    };

    return (
        <div>
            <SettingsButtonContainer
                isDark={isDark}
                // onClick={handleSettingsMenu}
            >
                <NameOfCity isDark={isDark}> Nantes </NameOfCity>
            </SettingsButtonContainer>
            <OptionsMenuContainer show={on} isDark={isDark}>
                {/* <LightDark
                    id={'lightDarkComponentId'}
                    isDark={isDark}
                    setIsDark={setIsDark}
                ></LightDark> */}
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
            </OptionsMenuContainer>
        </div>
    );
};

export default CityButton;
