import React, { useEffect, useState } from 'react';
import {
    ToastHistoryButton,
    ToastHistoryButtonIcon,
    ToastHistoryPannel,
    NotificationsTitle,
    NotificationsContainer,
    NotificationTemplateContainer,
    TitleText,
    DescriptionText,
    TimeText,
    LoadingSpinner,
} from './elements';
import { getNotifications } from '../../utils/notificationUtils';
import { Yellow, Black, White, Grey, DarkYellow, DarkGrey } from '../../colors';

interface ToastHistoryProps {
    id: string;
    isDark: boolean;
    toastHistoryData: any;
}

const ToastHistory: React.FC<ToastHistoryProps> = ({
    id,
    isDark,
    toastHistoryData,
}) => {
    const [toastHistoryExtended, setToastHistoryExtended] = useState(false);
    const [serverNotifications, setServerNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNotificationId, setSelectedNotificationId] = useState<
        string | null
    >(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchNotifications = async () => {
            if (userId) {
                try {
                    const fetchedNotifications = await getNotifications(userId);
                    setServerNotifications(fetchedNotifications.slice(0, 10));
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                }
            }
            setLoading(false);
        };

        fetchNotifications();
    }, [userId]);

    const handleToastHistoryPannelButtonClicked = () => {
        setToastHistoryExtended(!toastHistoryExtended);
    };

    const handleNotificationClick = (id: string) => {
        setSelectedNotificationId(selectedNotificationId === id ? null : id);
    };

    const handleDeleteNotification = async (id: string) => {
        try {
            // Call API to delete notification
            // await deleteNotificationAPI(id);
            setServerNotifications((prevNotifications) =>
                prevNotifications.filter(
                    (notification) => notification.id !== id
                )
            );
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const formatDate = (timeArray: number[]): string => {
        if (!Array.isArray(timeArray) || timeArray.length < 6) {
            return 'Invalid Date';
        }
        const [year, month, day, hour, minute, second] = timeArray;
        const date = new Date(year, month - 1, day, hour, minute, second);
        return date.toLocaleString();
    };

    return (
        <div>
            <ToastHistoryButton
                onClick={() => handleToastHistoryPannelButtonClicked()}
                isDark={isDark}
                show={toastHistoryExtended}
            >
                <ToastHistoryButtonIcon size={30} />
            </ToastHistoryButton>
            <ToastHistoryPannel isDark={isDark} show={toastHistoryExtended}>
                <NotificationsTitle isDark={isDark}>
                    Notifications
                </NotificationsTitle>
                <NotificationsContainer isDark={isDark}>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        serverNotifications.map((item: any, i: number) => (
                            <NotificationTemplateContainer
                                key={item.id}
                                isDark={isDark}
                                y={50 * i}
                                onClick={() => handleNotificationClick(item.id)}
                                style={{
                                    backgroundColor:
                                        selectedNotificationId === item.id
                                            ? DarkGrey
                                            : Grey,
                                }}
                            >
                                <TitleText isDark={isDark}>
                                    {item.title ? item.title : 'No Title'}
                                </TitleText>
                                <DescriptionText isDark={isDark}>
                                    {item.description
                                        ? item.description
                                        : 'No Description'}
                                </DescriptionText>
                                <TimeText isDark={isDark}>
                                    {formatDate(item.time)}
                                </TimeText>
                                {selectedNotificationId === item.id && (
                                    <button
                                        onClick={() =>
                                            handleDeleteNotification(item.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                )}
                            </NotificationTemplateContainer>
                        ))
                    )}
                </NotificationsContainer>
            </ToastHistoryPannel>
        </div>
    );
};

export default ToastHistory;
