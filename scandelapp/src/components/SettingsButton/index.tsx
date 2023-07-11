import * as React from 'react'
import { SettingsButtonContainer, NameOfCity } from './element'

/** SettingsButton of the main page Scandela
 * This SettingsButton allow the user to disconnect from his account and to switch le lightmod
 * @param {boolean} isDark - If the mode is dark or not
**/

interface SettingsButtonProps {
    isDark: boolean;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ isDark }) => {
    return (
        <SettingsButtonContainer isDark={isDark}>
          <NameOfCity isDark={isDark}> Nantes </NameOfCity>
        </SettingsButtonContainer>
    )
}

export default SettingsButton