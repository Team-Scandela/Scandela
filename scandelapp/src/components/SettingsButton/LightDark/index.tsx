import { SunButton, MoonButton } from './elements';
import RadioButton from '../../RadioButton';

/** Ligth / Dark mode button
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
 */

interface LightDarkProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const LightDark: React.FC<LightDarkProps> = ({ isDark, setIsDark }) => {
    /** Handle the click on the button and switch to the other mode */
    const handleToggleLightDark = () => {
        setIsDark(!isDark);
    };

    return (
        <div>
            <SunButton size={40} />
            <RadioButton
                isDark={isDark}
                top={'200px'}
                left={'200px'}
                trigger={isDark}
                setTrigger={handleToggleLightDark}
            />
            <MoonButton size={40} />
        </div>
    );
};

export default LightDark;
