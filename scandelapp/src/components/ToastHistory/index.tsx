import { useState } from 'react';
import {
    ToastHistoryButton,
    ToastHistoryButtonIcon,
    ToastHistoryPannel,
    NotificationsTitle,
    NotificationsContainer,
    NotificationTemplateContainer,
    DescriptionText,
    TimeText,
} from './elements';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { Black } from '../../colors';

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
    const [toastHistoryExtended, setToastHistoryExtended] = useState(false);

    const handleToastHistoryPannelButtonClicked = () => {
        setToastHistoryExtended(!toastHistoryExtended);
    };

    const { t } = useTranslation();

    return (
        <div>
            <Tooltip
                id="toastHistory"
                style={{ backgroundColor: Black, borderRadius: '5px' }}
            />
            <ToastHistoryButton
                onClick={() => handleToastHistoryPannelButtonClicked()}
                isDark={isDark}
                show={toastHistoryExtended}
                data-tooltip-id="toastHistory"
                data-tooltip-content={t('toastHistory')}
            >
                <ToastHistoryButtonIcon size={30} />
            </ToastHistoryButton>
            <ToastHistoryPannel isDark={isDark} show={toastHistoryExtended}>
                <NotificationsTitle isDark={isDark}>
                    Notifications
                </NotificationsTitle>
                <NotificationsContainer isDark={isDark}>
                    {toastHistoryData.map((item: any, i: number) => (
                        <NotificationTemplateContainer
                            isDark={isDark}
                            y={53 * i}
                        >
                            <DescriptionText isDark={isDark}>
                                {item.description}
                            </DescriptionText>
                            <TimeText isDark={isDark}>{item.time}</TimeText>
                        </NotificationTemplateContainer>
                    ))}
                </NotificationsContainer>
            </ToastHistoryPannel>
        </div>
    );
};

export default ToastHistory;
