import * as React from 'react';
import {
    ToastHistoryButton,
    ToastHistoryButtonIcon,
    ToastHistoryPannel,
    NotificationsText,
    NotificationsContainer,
    NotificationTemplateContainer,
    DescriptionText,
    TimeText,
} from './elements';

/**
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {list} toastHistoryData - List of notifications
 *
 */
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
    const [toastHistoryExtended, setToastHistoryExtended] = React.useState(false);

    const handleToastHistoryPannelButtonClicked = () => {
        setToastHistoryExtended(!toastHistoryExtended);
    }

    return (
        <div>
            <ToastHistoryButton
                onClick={() => handleToastHistoryPannelButtonClicked()}
                isDark={isDark}
                show={toastHistoryExtended}
            >
                <ToastHistoryButtonIcon size={30} />
            </ToastHistoryButton>
            <ToastHistoryPannel
                isDark={isDark}
                show={toastHistoryExtended}
            >
                <NotificationsText isDark={isDark}>Notifications</NotificationsText>
                <NotificationsContainer isDark={isDark}>
                    {toastHistoryData.map((item: any, i: number) => (
                        <NotificationTemplateContainer isDark={isDark} y={53 * i}>
                            <DescriptionText isDark={isDark}>{item.description}</DescriptionText>
                            <TimeText isDark={isDark}>{item.time}</TimeText>
                        </NotificationTemplateContainer>
                    ))}
                </NotificationsContainer>
            </ToastHistoryPannel>
        </div>
    );
};

export default ToastHistory;
