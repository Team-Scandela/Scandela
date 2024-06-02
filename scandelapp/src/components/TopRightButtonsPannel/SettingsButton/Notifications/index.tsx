import React, { useEffect, useState } from 'react';
import { NotificationTitle } from './elements';
import RadioButton from '../../../RadioButton';
import { useTranslation } from 'react-i18next';
import {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
} from '../../../../utils/notificationUtils';
import { Button, Modal, Spinner } from 'react-bootstrap';

/** Notifications setting component props
 * @param {boolean} isDark - If the mode is dark or not
 * @param {any} notificationsPreference - Notifications preference data
 * @param {function} setNotificationsPreference - setter
 */

interface NotificationsProps {
    isDark: boolean;
    notificationsPreference: any;
    setNotificationsPreference: (item: any) => void;
    userId: string; // Add userId prop to fetch notifications for this user
}

const Notifications: React.FC<NotificationsProps> = ({
    isDark,
    notificationsPreference,
    setNotificationsPreference,
    userId
}) => {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const fetchedNotifications = await getNotifications(userId);
                setNotifications(fetchedNotifications.slice(0, 10)); // Get the last 10 notifications
                setLoading(false);
            } catch (error) {
                setError('Failed to load notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

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

    return (
        <div>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id}>{notification.message}</li>
                    ))}
                </ul>
            )}
            <NotificationTitle isDark={isDark} top={'140px'} left={'40px'}>
                {t('actionListUpdates')}
            </NotificationTitle>
            <RadioButton
                isDark={isDark}
                top={'130px'}
                left={'350px'}
                trigger={
                    notificationsPreference.find(
                        (item: any) => item[0] === 'actionListUpdate'
                    )[1]
                }
                setTrigger={handleToggleActionListUpdate}
            />
            <NotificationTitle isDark={isDark} top={'200px'} left={'40px'}>
                {t('lightDarkModeUpdates')}
            </NotificationTitle>
            <RadioButton
                isDark={isDark}
                top={'190px'}
                left={'350px'}
                trigger={
                    notificationsPreference.find(
                        (item: any) => item[0] === 'lightDarkModeUpdate'
                    )[1]
                }
                setTrigger={handleToggleLightDarkModeUpdate}
            />
            <NotificationTitle isDark={isDark} top={'260px'} left={'40px'}>
                {t('languageUpdates')}
            </NotificationTitle>
            <RadioButton
                isDark={isDark}
                top={'250px'}
                left={'350px'}
                trigger={
                    notificationsPreference.find(
                        (item: any) => item[0] === 'languageUpdate'
                    )[1]
                }
                setTrigger={handleToggleLanguageUpdate}
            />
        </div>
    );
};

export default Notifications;




// import React, { useEffect, useState } from 'react';
// import { NotificationTitle } from './elements';
// import RadioButton from '../../../RadioButton';
// import { useTranslation } from 'react-i18next';
// import {
//     getNotifications,
//     createNotification,
//     updateNotification,
//     deleteNotification
// } from '../../../../utils/notificationUtils';
// import {Button, Modal, Spinner } from 'react-bootstrap';

// /** Notifications setting component props
//  * @param {boolean} isDark - If the mode is dark or not
//  * @param {any} notificationsPreference - Notifications preference data
//  * @param {function} setNotificationsPreference - setter
//  */

// interface NotificationsProps {
//     isDark: boolean;
//     notificationsPreference: any;
//     setNotificationsPreference: (item: any) => void;
// }

// const Notifications: React.FC<NotificationsProps> = ({
//     isDark,
//     notificationsPreference,
//     setNotificationsPreference,
// }) => {
//     const { t } = useTranslation();

//     const handleToggleActionListUpdate = () => {
//         const index = notificationsPreference.findIndex(
//             (item: any) => item[0] === 'actionListUpdate'
//         );

//         if (index !== -1) {
//             const updatedNotificationsPreference = [...notificationsPreference];

//             updatedNotificationsPreference[index] = [
//                 'actionListUpdate',
//                 !updatedNotificationsPreference[index][1],
//             ];

//             setNotificationsPreference(updatedNotificationsPreference);
//         }
//     };

//     const handleToggleLightDarkModeUpdate = () => {
//         const index = notificationsPreference.findIndex(
//             (item: any) => item[0] === 'lightDarkModeUpdate'
//         );

//         if (index !== -1) {
//             const updatedNotificationsPreference = [...notificationsPreference];

//             updatedNotificationsPreference[index] = [
//                 'lightDarkModeUpdate',
//                 !updatedNotificationsPreference[index][1],
//             ];

//             setNotificationsPreference(updatedNotificationsPreference);
//         }
//     };

//     const handleToggleLanguageUpdate = () => {
//         const index = notificationsPreference.findIndex(
//             (item: any) => item[0] === 'languageUpdate'
//         );

//         if (index !== -1) {
//             const updatedNotificationsPreference = [...notificationsPreference];

//             updatedNotificationsPreference[index] = [
//                 'languageUpdate',
//                 !updatedNotificationsPreference[index][1],
//             ];

//             setNotificationsPreference(updatedNotificationsPreference);
//         }
//     };

//     return (
//         <div>
//             <NotificationTitle isDark={isDark} top={'140px'} left={'40px'}>
//                 {t('actionListUpdates')}
//             </NotificationTitle>
//             <RadioButton
//                 isDark={isDark}
//                 top={'130px'}
//                 left={'350px'}
//                 trigger={
//                     notificationsPreference.find(
//                         (item: any) => item[0] === 'actionListUpdate'
//                     )[1]
//                 }
//                 setTrigger={handleToggleActionListUpdate}
//             />
//             <NotificationTitle isDark={isDark} top={'200px'} left={'40px'}>
//                 {t('lightDarkModeUpdates')}
//             </NotificationTitle>
//             <RadioButton
//                 isDark={isDark}
//                 top={'190px'}
//                 left={'350px'}
//                 trigger={
//                     notificationsPreference.find(
//                         (item: any) => item[0] === 'lightDarkModeUpdate'
//                     )[1]
//                 }
//                 setTrigger={handleToggleLightDarkModeUpdate}
//             />
//             <NotificationTitle isDark={isDark} top={'260px'} left={'40px'}>
//                 {t('languageUpdates')}
//             </NotificationTitle>
//             <RadioButton
//                 isDark={isDark}
//                 top={'250px'}
//                 left={'350px'}
//                 trigger={
//                     notificationsPreference.find(
//                         (item: any) => item[0] === 'languageUpdate'
//                     )[1]
//                 }
//                 setTrigger={handleToggleLanguageUpdate}
//             />
//         </div>
//     );
// };

// export default Notifications;
