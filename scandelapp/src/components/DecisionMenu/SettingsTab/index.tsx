import { useState } from 'react';
import {
    ButtonsMenuContainer,
    ContentContainer,
    LightModeButton,
    LanguageButton,
    CityButton,
    NotificationButton,
    BackToLandingPageButton,
    TitleText,
} from './elements';
import LightDark from './LightDark';
import Language from './Language';
import City from './City';
import Notifications from './Notifications';
import { FiSun } from 'react-icons/fi';
import { MdOutlineLanguage } from 'react-icons/md';
import { FaTreeCity } from 'react-icons/fa6';
import { IoNotifications } from 'react-icons/io5';
import { TbHomeMove } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

enum SettingsTabs {
    City,
    LightDarkMode,
    Language,
    Notifications,
}

interface SettingsTabProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    notificationsPreference: any;
    setNotificationsPreference: (item: any) => void;
    addNotificationToList: (description: string) => void;
    tooltipPreference: boolean;
    setTooltipPreference: (value: boolean) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
    isDark,
    setIsDark,
    notificationsPreference,
    setNotificationsPreference,
    addNotificationToList,
    tooltipPreference,
    setTooltipPreference,
}) => {
    const [currentOptionSelected, setCurrentOptionSeleted] = useState(
        SettingsTabs.City
    );
    const [currentLanguage, setCurrentLanguage] = useState(false); // true : en, false: fr
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/homepage');
    };

    return (
        <div>
            <ButtonsMenuContainer isDark={isDark}>
                <CityButton
                    isDark={isDark}
                    onClick={() => setCurrentOptionSeleted(SettingsTabs.City)}
                >
                    <FaTreeCity size={50} />
                </CityButton>
                <LightModeButton
                    isDark={isDark}
                    onClick={() =>
                        setCurrentOptionSeleted(SettingsTabs.LightDarkMode)
                    }
                >
                    <FiSun size={50} />
                </LightModeButton>
                <LanguageButton
                    isDark={isDark}
                    onClick={() =>
                        setCurrentOptionSeleted(SettingsTabs.Language)
                    }
                >
                    <MdOutlineLanguage size={50} />
                </LanguageButton>
                <NotificationButton
                    isDark={isDark}
                    onClick={() =>
                        setCurrentOptionSeleted(SettingsTabs.Notifications)
                    }
                >
                    <IoNotifications size={50} />
                </NotificationButton>
                <BackToLandingPageButton
                    isDark={isDark}
                    onClick={() => handleLogout()}
                >
                    <TbHomeMove size={50} />
                </BackToLandingPageButton>
            </ButtonsMenuContainer>
            <ContentContainer isDark={isDark}>
                {currentOptionSelected === SettingsTabs.City && (
                    <div>
                        <TitleText isDark={isDark}>{t('Nantes')}</TitleText>
                        <City
                            isDark={isDark}
                            tooltipPreference={tooltipPreference}
                            setTooltipPreference={setTooltipPreference}
                        />
                    </div>
                )}
                {currentOptionSelected === SettingsTabs.LightDarkMode && (
                    <div>
                        <TitleText isDark={isDark}>
                            {t('lightDarkMode')}
                        </TitleText>
                        <LightDark
                            isDark={isDark}
                            setIsDark={setIsDark}
                            notificationsPreference={notificationsPreference}
                            addNotificationToList={addNotificationToList}
                        />
                    </div>
                )}
                {currentOptionSelected === SettingsTabs.Language && (
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
                            notificationsPreference={notificationsPreference}
                            addNotificationToList={addNotificationToList}
                        />
                    </div>
                )}
                {currentOptionSelected === SettingsTabs.Notifications && (
                    <div>
                        <TitleText isDark={isDark}>
                            {t('notifications')}
                        </TitleText>
                        <Notifications
                            isDark={isDark}
                            notificationsPreference={notificationsPreference}
                            setNotificationsPreference={
                                setNotificationsPreference
                            }
                        />
                    </div>
                )}
            </ContentContainer>
        </div>
    );
};

export default SettingsTab;
