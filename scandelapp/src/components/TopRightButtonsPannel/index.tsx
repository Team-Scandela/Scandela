import { useState } from 'react';
import ActionsList from './ActionsList';
import SettingsButton from './SettingsButton';
import AddEntityButton from './AddEntityButton';
import ModifyEntityButton from './ModifyEntityButton';
import LogoutButton from './LogoutButton';
import CityButton from './CityButton';
import LampsPanelButton from './LampsPanel';

/** City button of the main page Scandela
 * @param {any} id
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Setter for the isDark boolean
 * @param {boolean} actionsListExtended - Boolean to check if the actions list is extended or not
 * @param {function} setActionsListExtended - Setter function
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} setOptimisationTemplateData - Setter function
 * @param {any} notificationsPreference - List of the notifications preferences
 * @param {function} setNotificationsPreference - Setter for the notificationsPreference
 * @param {function} addNotificationToList - Function to add the new notifications to the list
 **/

interface TopRightButtonsPannelProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    actionsListExtended: boolean;
    setActionsListExtended: (data: any) => void;
    decisionPanelExtended: boolean;
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
    notificationsPreference: any;
    setNotificationsPreference: (item: any) => void;
    addNotificationToList: (description: string) => void;
}

const TopRightButtonsPannel: React.FC<TopRightButtonsPannelProps> = ({
    id,
    isDark,
    setIsDark,
    actionsListExtended,
    setActionsListExtended,
    decisionPanelExtended,
    optimisationTemplateData,
    setOptimisationTemplateData,
    notificationsPreference,
    setNotificationsPreference,
    addNotificationToList,
}) => {
    const [isSettingsPannelOpen, setIsSettingsPannelOpen] = useState(false);
    const [isEntityPannelOpen, setIsEntityPannelOpen] = useState(false);
    const [isAddEntityPannelOpen, setIsAddEntityPannelOpen] = useState(false);
    const [isLampsPanelOpen, setIsLampsPanelOPen] = useState(false);

    const handleSettingsButtonClick = () => {
        if (!isSettingsPannelOpen) {
            setIsEntityPannelOpen(false);
            setIsAddEntityPannelOpen(false);
            setIsLampsPanelOPen(false);
        }
        setIsSettingsPannelOpen(!isSettingsPannelOpen);
    };

    const handleEntityButtonClick = () => {
        if (!isEntityPannelOpen) {
            setIsSettingsPannelOpen(false);
            setIsAddEntityPannelOpen(false);
            setIsLampsPanelOPen(false);
        }
        setIsEntityPannelOpen(!isEntityPannelOpen);
    };

    const handleAddEntityButtonClick = () => {
        if (!isAddEntityPannelOpen) {
            setIsSettingsPannelOpen(false);
            setIsEntityPannelOpen(false);
            setIsLampsPanelOPen(false);
        }
        setIsAddEntityPannelOpen(!isAddEntityPannelOpen);
    };

    const handleLampsPanelButtonClick = () => {
        if (!isLampsPanelOpen) {
            setIsSettingsPannelOpen(false);
            setIsEntityPannelOpen(false);
            setIsAddEntityPannelOpen(false);
        }
        setIsLampsPanelOPen(!isLampsPanelOpen);
    };

    return (
        <div>
            {localStorage.getItem('premium') === 'true' && (
                <div>
                    <ActionsList
                        isDark={isDark}
                        actionsListExtended={actionsListExtended}
                        setActionsListExtended={setActionsListExtended}
                        decisionPanelExtended={decisionPanelExtended}
                        optimisationTemplateData={optimisationTemplateData}
                        setOptimisationTemplateData={
                            setOptimisationTemplateData
                        }
                    />
                    <LampsPanelButton
                        isDark={isDark}
                        isLampsPanelOpen={isLampsPanelOpen}
                        handleLampsPanelButtonClick={handleLampsPanelButtonClick}
                        decisionPanelExtended={decisionPanelExtended}
                    />
                    <ModifyEntityButton
                        isDark={isDark}
                        isEntityPannelOpen={isEntityPannelOpen}
                        handleEntityButtonClick={handleEntityButtonClick}
                        decisionPanelExtended={decisionPanelExtended}
                    />
                    <AddEntityButton
                        isDark={isDark}
                        isAddEntityPannelOpen={isAddEntityPannelOpen}
                        handleAddEntityButtonClick={handleAddEntityButtonClick}
                        decisionPanelExtended={decisionPanelExtended}
                    />
                    <SettingsButton
                        isDark={isDark}
                        setIsDark={setIsDark}
                        isSettingsPannelOpen={isSettingsPannelOpen}
                        handleSettingsButtonClick={handleSettingsButtonClick}
                        decisionPanelExtended={decisionPanelExtended}
                        notificationsPreference={notificationsPreference}
                        setNotificationsPreference={setNotificationsPreference}
                        addNotificationToList={addNotificationToList}
                    />
                </div>
            )}
            <LogoutButton isDark={isDark} />
            <CityButton isDark={isDark} />
        </div>
    );
};

export default TopRightButtonsPannel;
