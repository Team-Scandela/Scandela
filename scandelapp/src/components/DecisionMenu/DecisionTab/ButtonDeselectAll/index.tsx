import { ButtonDeselectAllContainer } from './elements';
import { useTranslation } from 'react-i18next';

/** Button to DeselectAll of the Decison Help Menu
 * This Button allow the user to deselect all optimisations
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface ButtonDeselectAllProps {
    isDark: boolean;
    handleButtonDeselectAllClick: () => void;
}

const ButtonDeselectAll: React.FC<ButtonDeselectAllProps> = ({
    isDark,
    handleButtonDeselectAllClick,
}) => {
    const { t } = useTranslation();

    return (
        <div>
            <ButtonDeselectAllContainer
                isDark={isDark}
                onClick={() => handleButtonDeselectAllClick()}
            >
                {t('deselectAll')}
            </ButtonDeselectAllContainer>
        </div>
    );
};

export default ButtonDeselectAll;
