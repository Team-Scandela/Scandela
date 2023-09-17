import * as React from 'react'
import { SettingsButtonContainer, NameOfCity, OptionsMenuContainer, LogoutButton, ProfileButton, LanguageButton} from './element'
import LightDark from '../LightDark'


/** SettingsButton of the main page Scandela
 * This SettingsButton allow the user to disconnect from his account and to switch le lightmod
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
**/

interface SettingsButtonProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ isDark, setIsDark }) => {
    /** If the option menu is open or closed */
    const [on, setOn] = React.useState(false);

    return (
        <div>
            <SettingsButtonContainer isDark={isDark} onClick={() => setOn(!on)}>
                <NameOfCity isDark={isDark}> Nantes </NameOfCity>
            </SettingsButtonContainer>
            <OptionsMenuContainer show={on} isDark={isDark}>
                <ProfileButton></ProfileButton>
                <LightDark isDark={isDark} setIsDark={setIsDark}></LightDark>
                <LanguageButton></LanguageButton>
                <LogoutButton></LogoutButton>
            </OptionsMenuContainer>
        </div>
    )
}

export default SettingsButton