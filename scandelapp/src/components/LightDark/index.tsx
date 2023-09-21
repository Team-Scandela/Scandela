import * as React from 'react'
import { SunButton, MoonButton } from './elements';

/** Ligth / Dark mode button
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
 */

interface LightDarkProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const LightDark: React.FC<LightDarkProps> = ({ id, isDark, setIsDark }) => {
    /** Handle the click on the button and switch to the other mode */
    const handleIconClick = () => {
        setIsDark(!isDark);
    };

    return (
        <div>
            {isDark ? <SunButton onClick={handleIconClick}/> : <MoonButton onClick={handleIconClick}/>}
        </div>
    );
};

export default LightDark;
