import * as React from 'react';
import {
    SettingsButtonContainer,
    SettingsPannelContainer,
} from './elements';

interface SettingsButtonProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
    id,
    isDark,
    setIsDark,
}) => {
    const [isSettingsPannelOpen, setIsSettingsPannelOpen] = React.useState(false);

    const handleSettingsButtonClick = () => {
        setIsSettingsPannelOpen(!isSettingsPannelOpen);
    };

    return (
        <div>
            <SettingsButtonContainer isDark={isDark} onClick={handleSettingsButtonClick}></SettingsButtonContainer>
            {isSettingsPannelOpen && (
                <SettingsPannelContainer isDark={isDark}>
                </SettingsPannelContainer>
            )}
        </div>
    );
};

export default SettingsButton;
