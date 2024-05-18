import { SettingsButtonContainer, NameOfCity } from './elements';

/** City button of the main page Scandela
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface CityButtonProps {
    isDark: boolean;
}

const CityButton: React.FC<CityButtonProps> = ({ isDark }) => {
    return (
        <div>
            <SettingsButtonContainer isDark={isDark}>
                <NameOfCity isDark={isDark}> Nantes </NameOfCity>
            </SettingsButtonContainer>
        </div>
    );
};

export default CityButton;
