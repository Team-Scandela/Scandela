import { useState, useEffect } from 'react';
import { LoadingTitle, NotificationTitle } from './elements';
import RadioButton from '../../../RadioButton';
import { useTranslation } from 'react-i18next';
import {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
} from '../../../../utils/notificationUtils';
import { getUser, putUser } from '../../../../utils/userUtils';

/** Notifications setting component props
 * @param {boolean} isDark - If the mode is dark or not
 * @param {any} notificationsPreference - Notifications preference data
 * @param {function} setNotificationsPreference - setter
 */

interface NotificationsProps {
    isDark: boolean;
    notificationsPreference: any;
    setNotificationsPreference: (item: any) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
    isDark,
    notificationsPreference,
    setNotificationsPreference,
}) => {
    const [newsletter, setNewsletter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const getUserInfoAsync = async () => {
            const userInfos = await getUser();
            setNewsletter(userInfos.newsletter);
            setIsLoading(false);
        };
        getUserInfoAsync();
    }, []);

    const handleToggleActionListUpdate = () => {
        const index = notificationsPreference.findIndex(
            (item: any) => item[0] === 'actionListUpdate'
        );

        if (index !== -1) {
            const updatedNotificationsPreference = [...notificationsPreference];

            updatedNotificationsPreference[index] = [
                'actionListUpdate',
                !updatedNotificationsPreference[index][1],
            ];

            setNotificationsPreference(updatedNotificationsPreference);
        }
    };

    const handleToggleLightDarkModeUpdate = () => {
        const index = notificationsPreference.findIndex(
            (item: any) => item[0] === 'lightDarkModeUpdate'
        );

        if (index !== -1) {
            const updatedNotificationsPreference = [...notificationsPreference];

            updatedNotificationsPreference[index] = [
                'lightDarkModeUpdate',
                !updatedNotificationsPreference[index][1],
            ];

            setNotificationsPreference(updatedNotificationsPreference);
        }
    };

    const handleToggleLanguageUpdate = () => {
        const index = notificationsPreference.findIndex(
            (item: any) => item[0] === 'languageUpdate'
        );

        if (index !== -1) {
            const updatedNotificationsPreference = [...notificationsPreference];

            updatedNotificationsPreference[index] = [
                'languageUpdate',
                !updatedNotificationsPreference[index][1],
            ];

            setNotificationsPreference(updatedNotificationsPreference);
        }
    };

    const updateUser = async () => {
        const user = await getUser();
        const updatedUserData = {
            town: user.town,
            email: user.email,
            username: user.username,
            password: user.password,
            rights: user.rights,
            moreInformations: user.moreInformations,
            darkmode: user.darkmode,
            lastConnexion: user.lastConnexion,
            newsletter: !user.newsletter,
            premium: user.premium,
        };
        putUser(updatedUserData);
    };

    const handleToggleNewsletterUpdate = () => {
        setNewsletter(!newsletter);
        try {
            updateUser();
        } catch (error) {}
    };

    return (
        <div>
            {isLoading && (
                <div>
                    <LoadingTitle isDark={isDark}>
                        {t('loadOfYourPreferences')}
                    </LoadingTitle>
                </div>
            )}
            {!isLoading && (
                <div>
                    <NotificationTitle
                        isDark={isDark}
                        top={'130px'}
                        left={'40px'}
                    >
                        {t('actionListUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'120px'}
                        left={'350px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'actionListUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleActionListUpdate}
                    />
                    <NotificationTitle
                        isDark={isDark}
                        top={'190px'}
                        left={'40px'}
                    >
                        {t('lightDarkModeUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'180px'}
                        left={'350px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'lightDarkModeUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleLightDarkModeUpdate}
                    />
                    <NotificationTitle
                        isDark={isDark}
                        top={'250px'}
                        left={'40px'}
                    >
                        {t('languageUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'240px'}
                        left={'350px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'languageUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleLanguageUpdate}
                    />
                    <NotificationTitle
                        isDark={isDark}
                        top={'310px'}
                        left={'40px'}
                    >
                        {t('newsletterUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'300px'}
                        left={'350px'}
                        trigger={newsletter}
                        setTrigger={handleToggleNewsletterUpdate}
                    />
                </div>
            )}
        </div>
    );
};

export default Notifications;
