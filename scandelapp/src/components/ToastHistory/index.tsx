import React, { useState, useEffect } from 'react';
import {
    ToastHistoryButton,
    ToastHistoryButtonIcon,
    ToastHistoryPannel,
    NotificationsTitle,
    NotificationsContainer,
    NotificationTemplateContainer,
    DescriptionText,
    TimeText,
    Checkbox,
    DeleteButton,
    Popup,
    PopupContent,
    PopupButton,
} from './elements';
import { getLatestNotifications, saveNotification, deleteNotifications, Notification } from './notificationUtils';

interface ToastHistoryProps {
    id: string;
    isDark: boolean;
    userId: string;
}

const ToastHistory: React.FC<ToastHistoryProps> = ({ id, isDark, userId }) => {
    const [toastHistoryExtended, setToastHistoryExtended] = useState(false);
    const [toastHistoryData, setToastHistoryData] = useState<Notification[]>([]);
    const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            const notifications = await getLatestNotifications(userId);
            setToastHistoryData(notifications);
        };

        fetchNotifications();
    }, [userId]);

    const handleToastHistoryPannelButtonClicked = () => {
        setToastHistoryExtended(!toastHistoryExtended);
    };

    const handleSaveNotification = async (notification: Notification) => {
        await saveNotification(notification);
        const notifications = await getLatestNotifications(userId);
        setToastHistoryData(notifications);
    };

    const handleCheckboxChange = (notificationId: string) => {
        setSelectedNotifications((prevSelected) =>
            prevSelected.includes(notificationId)
                ? prevSelected.filter((id) => id !== notificationId)
                : [...prevSelected, notificationId]
        );
    };

    const handleDeleteButtonClick = () => {
        setShowPopup(true);
    };

    const handleConfirmDelete = async () => {
        await deleteNotifications(selectedNotifications);
        const notifications = await getLatestNotifications(userId);
        setToastHistoryData(notifications);
        setSelectedNotifications([]);
        setShowPopup(false);
    };

    const handleCancelDelete = () => {
        setShowPopup(false);
    };

    const createNewNotification = () => {
        const newNotification: Notification = {
            id: 'new-id', // L'id est généralement généré par le backend
            description: 'Nouvelle notification',
            time: new Date().toISOString(),
            user: {
                id: userId,
                username: 'username', // Récupérez ou passez le nom d'utilisateur réel
            },
        };

        handleSaveNotification(newNotification);
    };

    return (
        <div>
            <ToastHistoryButton
                onClick={handleToastHistoryPannelButtonClicked}
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
                    {toastHistoryData.map((item, i) => (
                        <NotificationTemplateContainer
                            key={item.id}
                            isDark={isDark}
                            y={53 * i}
                        >
                            <Checkbox
                                type="checkbox"
                                checked={selectedNotifications.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <DescriptionText isDark={isDark}>
                                {item.description}
                            </DescriptionText>
                            <TimeText isDark={isDark}>
                                {new Date(item.time).toLocaleString()}
                            </TimeText>
                        </NotificationTemplateContainer>
                    ))}
                </NotificationsContainer>
                <DeleteButton onClick={handleDeleteButtonClick} disabled={selectedNotifications.length === 0}>
                    Supprimer les notifications sélectionnées
                </DeleteButton>
            </ToastHistoryPannel>
            <button onClick={createNewNotification}>Créer une notification</button>

            {showPopup && (
                <Popup>
                    <PopupContent>
                        <p>Êtes-vous sûr de vouloir supprimer les notifications sélectionnées ?</p>
                        <PopupButton onClick={handleConfirmDelete}>Oui</PopupButton>
                        <PopupButton onClick={handleCancelDelete}>Non</PopupButton>
                    </PopupContent>
                </Popup>
            )}
        </div>
    );
};

export default ToastHistory;
