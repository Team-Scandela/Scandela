import * as React from 'react';
import { useState } from 'react';
import {
    PremiumButtonStyle,
    VersionText,
    PremiumButtonPopupContainer,
    PremiumButtonOnOffStyle,
    PremiumButtonOnOffText,
} from './elements';
import {FaCrown} from 'react-icons/fa'

/** Menu of the premium button
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} isPremiumActivated - If the premium version is activated or not
 * @param {function} handleToggleIsPremiumActivated - Callback function
 */
interface PremiumButtonProps {
    isDark: boolean;
    isPremiumActivated: boolean;
    handleToggleIsPremiumActivated: () => void;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
    isDark,
    isPremiumActivated,
    handleToggleIsPremiumActivated,
}) => {

    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    const handleTogglePopupOpen = () => {
        setPopupOpen((prevState) => !prevState);
    };

    return (
        <div>
            <VersionText isDark={isDark} isPremiumActivated={isPremiumActivated}>{isPremiumActivated ? "Version premium" : "Version démo"}</VersionText>
            <PremiumButtonStyle isDark={isDark} onClick={() => handleTogglePopupOpen()}>
                <FaCrown size={32}/>
            </PremiumButtonStyle >
            {isPopupOpen && (
                <PremiumButtonPopupContainer isDark={isDark}>
                    <PremiumButtonOnOffStyle isDark={isDark} onClick={() => handleToggleIsPremiumActivated()}>
                        <PremiumButtonOnOffText isDark={isDark}>
                            {isPremiumActivated ? "Désactiver la version premium" : "Activer la version premium"}
                        </PremiumButtonOnOffText>
                    </PremiumButtonOnOffStyle>
                </PremiumButtonPopupContainer>
            )}
        </div>
    );
};

export default PremiumButton;