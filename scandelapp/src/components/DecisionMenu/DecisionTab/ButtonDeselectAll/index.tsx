import { ButtonDeselectAllContainer } from './elements';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../../Toastr';

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
                onClick={() => {
                    handleButtonDeselectAllClick();
                    // Add notification toast here
                    showToast(
                        'success',
                        t('actionsListSuccessfullyUpdated'),
                        'top-left',
                        5000,
                        false,
                        true,
                        false,
                        true
                    );
                }}
            >
                {t('deselectAll')}
            </ButtonDeselectAllContainer>
        </div>
    );
};

export default ButtonDeselectAll;
