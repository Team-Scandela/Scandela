import * as React from 'react';
import { SettingsButtonContainer, SettingsPannelContainer } from './elements';

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
    const [isSettingsPannelOpen, setIsSettingsPannelOpen] =
        React.useState(false);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    // const { i18n } = useTranslation();

    // const changeLanguage = (lng: string) => {
    //     i18n.changeLanguage(lng);
    // };

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
    }

    const handleSettingsButtonClick = () => {
        setIsSettingsPannelOpen(!isSettingsPannelOpen);
    };

    return (
        <div>
            <SettingsButtonContainer
                isDark={isDark}
                onClick={handleSettingsButtonClick}
            ></SettingsButtonContainer>
            {isSettingsPannelOpen && (
                <SettingsPannelContainer
                    isDark={isDark}
                ></SettingsPannelContainer>
            )}
        </div>
    );
};

export default SettingsButton;
