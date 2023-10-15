import * as React from 'react';
import { useState } from 'react';
import {
    PremiumButtonStyle,
    VersionText
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
    return (
        <div>
            <VersionText isDark={isDark} isPremiumActivated={isPremiumActivated}>{isPremiumActivated ? "Version premium" : "Version démo"}</VersionText>
            <PremiumButtonStyle isDark={isDark} onClick={() => handleToggleIsPremiumActivated()}>
                <FaCrown size={32}/>
            </PremiumButtonStyle >
        </div>
    );
};

export default PremiumButton;