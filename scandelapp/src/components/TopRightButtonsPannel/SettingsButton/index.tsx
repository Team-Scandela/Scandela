import { useState, useEffect } from 'react';
import {
    SettingsButtonContainer,
    SettingsPannelContainer,
    ButtonsMenuContainer,
    ContentContainer,
    LightModeButton,
    LanguageButton,
    DownloadButton,
    NotificationButton,
    ElectricityPriceButton,
    TitleText,
} from './elements';
import LightDark from './LightDark';
import Language from './Language';
import Download from './Download';
import EletricityPrice from './ElectricityPrice';
import Notifications from './Notifications';
import { FiSun } from 'react-icons/fi';
import { MdOutlineLanguage } from 'react-icons/md';
import { MdDownload, MdElectricBolt } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const userId = localStorage.getItem('userId');

interface SettingsButtonProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    isSettingsPannelOpen: boolean;
    handleSettingsButtonClick: () => void;
    decisionPanelExtended: boolean;
    notificationsPreference: any;
    setNotificationsPreference: (item: any) => void;
    addNotificationToList: (description: string) => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
    isDark,
    setIsDark,
    isSettingsPannelOpen,
    handleSettingsButtonClick,
    decisionPanelExtended,
    notificationsPreference,
    setNotificationsPreference,
    addNotificationToList,
}) => {
    const [currentOptionSelected, setCurrentOptionSeleted] =
        useState('lightmode');
    const [currentLanguage, setCurrentLanguage] = useState(true); // true : fr, false: en
    const { t } = useTranslation();

    useEffect(() => {
        if (decisionPanelExtended && isSettingsPannelOpen)
            handleSettingsButtonClick();
    });

    return (
        <div>
            <SettingsButtonContainer
                isDark={isDark}
                isOn={isSettingsPannelOpen}
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
                        <ElectricityPriceButton
                            isDark={isDark}
                            onClick={() =>
                                setCurrentOptionSeleted('electricityprice')
                            }
                        >
                            <MdElectricBolt size={50} />
                        </ElectricityPriceButton>
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
                                    {t('lightDarkMode')}
                                </TitleText>
                                <LightDark
                                    isDark={isDark}
                                    setIsDark={setIsDark}
                                    notificationsPreference={
                                        notificationsPreference
                                    }
                                    addNotificationToList={
                                        addNotificationToList
                                    }
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
                                    {t('language')}
                                </TitleText>
                                <Language
                                    isDark={isDark}
                                    currentLanguage={currentLanguage}
                                    setCurrentLanguage={setCurrentLanguage}
                                    notificationsPreference={
                                        notificationsPreference
                                    }
                                    addNotificationToList={
                                        addNotificationToList
                                    }
                                />
                            </div>
                        )}
                        {currentOptionSelected === 'download' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    {t('loadData')}
                                </TitleText>
                                <Download isDark={isDark} />
                            </div>
                        )}
                        {currentOptionSelected === 'electricityprice' && (
                            <div>
                                <TitleText isDark={isDark}>
                                    {t('electricityPrice')}
                                </TitleText>
                                <EletricityPrice isDark={isDark} />
                            </div>
                        )}
                        {currentOptionSelected === 'notification' && (
                <div>
                 <TitleText isDark={isDark}>
                        {t('notifications')}
                    </TitleText>
                       <Notifications
                          isDark={isDark}
                          notificationsPreference={notificationsPreference}
                         setNotificationsPreference={setNotificationsPreference}
                         userId={userId} // Transmettez userId à Notifications
                       />
                     </div>
                )}
                    </ContentContainer>
                </SettingsPannelContainer>
            )}
        </div>
    );
};

export default SettingsButton;
