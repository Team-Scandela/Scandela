import * as React from 'react';
import { useEffect } from 'react';
import {
    SettingsButtonContainer,
    SettingsPannelContainer,
    ButtonsMenuContainer,
    ContentContainer,
    LightModeButton,
    LanguageButton,
    DownloadButton,
    NotificationButton,
    TitleText,
} from './elements';
import LightDark from './LightDark';
import Language from './Language';
import Download from './Download';
import { FiSun } from 'react-icons/fi';
import { MdOutlineLanguage } from 'react-icons/md';
import { MdDownload } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import RadioButton from '../RadioButton';

interface SettingsButtonProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    decisionPanelExtended: boolean;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
    id,
    isDark,
    setIsDark,
    decisionPanelExtended,
}) => {
    const [isSettingsPannelOpen, setIsSettingsPannelOpen] =
        React.useState(false);
    const [currentOptionSelected, setCurrentOptionSeleted] =
        React.useState('lightmode');
    const [currentLanguage, setCurrentLanguage] = React.useState(false); // false : fr, true: en

    useEffect(() => {
        if (decisionPanelExtended && isSettingsPannelOpen)
            handleSettingsButtonClick();
    });

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
                <SettingsPannelContainer isDark={isDark}>
                    <ButtonsMenuContainer isDark={isDark}>
                        <LightModeButton
                            isDark={isDark}
                            onClick={() => setCurrentOptionSeleted('lightmode')}
                        >
                            <FiSun size={50} />
                        </LightModeButton>
                        <LanguageButton
                            isDark={isDark}
                            onClick={() => setCurrentOptionSeleted('language')}
                        >
                            <MdOutlineLanguage size={50} />
                        </LanguageButton>
                        <DownloadButton
                            isDark={isDark}
                            onClick={() => setCurrentOptionSeleted('download')}
                        >
                            <MdDownload size={50} />
                        </DownloadButton>
                        <NotificationButton
                            isDark={isDark}
                            onClick={() =>
                                setCurrentOptionSeleted('notification')
                            }
                        >
                            <IoNotifications size={50} />
                        </NotificationButton>
                    </ButtonsMenuContainer>
                    <ContentContainer isDark={isDark}>
                        {currentOptionSelected === 'lightmode' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    Mode sombre / clair
                                </TitleText>
                                <LightDark
                                    isDark={isDark}
                                    setIsDark={setIsDark}
                                />
                            </div>
                        )}
                        {currentOptionSelected === 'language' && (
                            <div>
                                <TitleText
                                    isDark={isDark}
                                    currentLanguage={currentLanguage}
                                    setCurrentLanguage={setCurrentLanguage}
                                >
                                    Langage
                                </TitleText>
                                <Language
                                    isDark={isDark}
                                    currentLanguage={currentLanguage}
                                    setCurrentLanguage={setCurrentLanguage}
                                />
                            </div>
                        )}
                        {currentOptionSelected === 'download' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    Charger des données
                                </TitleText>
                                <Download isDark={isDark} />
                            </div>
                        )}
                        {currentOptionSelected === 'notification' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    Notifications
                                </TitleText>
                            </div>
                        )}
                    </ContentContainer>
                </SettingsPannelContainer>
            )}
        </div>
    );
};

export default SettingsButton;
