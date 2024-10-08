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
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { Black } from '../../colors';
import { deleteNotification } from '../../utils/notificationUtils';

/**
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {list} toastHistoryData - List of notifications
 * @param {boolean} toastHistoryExtended - Boolean to check if the history is extended or not
 * @param {function} handleToastHistoryPannelButtonClicked - Setter for the toastHistoryExtended boolean
 * @param {boolean} tooltipPreference - Boolean to check if the tooltip are displayed or not
 *
 */
interface ToastHistoryProps {
    id: string;
    isDark: boolean;
    toastHistoryData: any;
    toastHistoryExtended: boolean;
    handleToastHistoryPannelButtonClicked: () => void;
    tooltipPreference: boolean;
}

const ToastHistory: React.FC<ToastHistoryProps> = ({
    id,
    isDark,
    toastHistoryData,
    toastHistoryExtended,
    handleToastHistoryPannelButtonClicked,
    tooltipPreference,
}) => {
    const { t } = useTranslation();

    const formatDate = (time: any): string => {
        if (!Array.isArray(time)) return time;
        if (time.length < 6) {
            return 'Invalid Date';
        }
        const [year, month, day, hour, minute, second] = time;
        const date = new Date(year, month - 1, day, hour, minute, second);
        return date.toLocaleString();
    };

    return (
        <div>
            {tooltipPreference && (
                <Tooltip
                    id="toastHistory"
                    style={{
                        backgroundColor: Black,
                        borderRadius: '5px',
                        userSelect: 'none',
                    }}
                />
            )}
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
                            y={63 * i}
                        >
                            <DescriptionText isDark={isDark}>
                                {item.description}
                            </DescriptionText>
                            <TimeText isDark={isDark}>
                                {formatDate(item.time)}
                            </TimeText>
                        </NotificationTemplateContainer>
                    ))}
                </NotificationsContainer>
            </ToastHistoryPannel>
        </div>
    );
};

export default ToastHistory;
