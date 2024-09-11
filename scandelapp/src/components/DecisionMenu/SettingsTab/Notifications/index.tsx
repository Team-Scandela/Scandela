import { useState, useEffect } from 'react';
import { LoadingTitle, NotificationTitle, SubTitleText } from './elements';
import RadioButton from '../../../RadioButton';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../../Toastr';
import { createNotification } from '../../../../utils/notificationUtils';
import { getUser, putUser } from '../../../../utils/userUtils';

/** Notifications setting component props
 * @param {boolean} isDark - If the mode is dark or not
 * @param {any} notificationsPreference - Notifications preference data
 * @param {function} setNotificationsPreference - setter
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 * @param {any} notificationsPreference - Notifications preference data
 */

interface NotificationsProps {
    isDark: boolean;
    notificationsPreference: any;
    setNotificationsPreference: (item: any) => void;
    addNotificationToList: (description: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
    isDark,
    notificationsPreference,
    setNotificationsPreference,
    addNotificationToList,
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
        handleNotification();
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
        handleNotification();
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
        handleNotification();
    };

    const handleToggleExportPdfUpdate = () => {
        const index = notificationsPreference.findIndex(
            (item: any) => item[0] === 'exportPdfUpdate'
        );

        if (index !== -1) {
            const updatedNotificationsPreference = [...notificationsPreference];

            updatedNotificationsPreference[index] = [
                'exportPdfUpdate',
                !updatedNotificationsPreference[index][1],
            ];

            setNotificationsPreference(updatedNotificationsPreference);
        }
        handleNotification();
    };

    const handleNotification = async () => {
        showToast(
            'success',
            t('notificationsPreferencesSuccessfullyUpdated'),
            'top-left',
            5000,
            false,
            true,
            false,
            true
        );

        const userId = localStorage.getItem('userId');
        if (userId) {
            await createNotification({
                user: { id: userId },
                title: t('notificationsPreferencesUpdates'),
                description: t('notificationsPreferencesSuccessfullyUpdated'),
                triggered: true,
            });
        }
        addNotificationToList(t('notificationsPreferencesSuccessfullyUpdated'));
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
                        top={'100px'}
                        left={'30px'}
                    >
                        {t('actionListUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'90px'}
                        left={'340px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'actionListUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleActionListUpdate}
                    />
                    <NotificationTitle
                        isDark={isDark}
                        top={'160px'}
                        left={'30px'}
                    >
                        {t('themeUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'150px'}
                        left={'340px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'lightDarkModeUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleLightDarkModeUpdate}
                    />
                    <NotificationTitle
                        isDark={isDark}
                        top={'220px'}
                        left={'30px'}
                    >
                        {t('languageUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'210px'}
                        left={'340px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'languageUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleLanguageUpdate}
                    />
                    <NotificationTitle
                        isDark={isDark}
                        top={'280px'}
                        left={'30px'}
                    >
                        {t('actionsListExportedUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'270px'}
                        left={'340px'}
                        trigger={
                            notificationsPreference.find(
                                (item: any) => item[0] === 'exportPdfUpdate'
                            )[1]
                        }
                        setTrigger={handleToggleExportPdfUpdate}
                    />
                    <SubTitleText isDark={isDark}>{t('Email')}</SubTitleText>
                    <NotificationTitle
                        isDark={isDark}
                        top={'530px'}
                        left={'30px'}
                    >
                        {t('newsletterUpdates')}
                    </NotificationTitle>
                    <RadioButton
                        isDark={isDark}
                        top={'520px'}
                        left={'340px'}
                        trigger={newsletter}
                        setTrigger={handleToggleNewsletterUpdate}
                    />
                </div>
            )}
        </div>
    );
};

export default Notifications;
