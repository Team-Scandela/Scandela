import { ButtonSelectAllContainer } from './elements';
import { useTranslation } from 'react-i18next';

/** Button EditInPDf of the Decison Help Menu
 * This Button allow the user to summarize all the infos that Scandela
 * will give him about how to decrease his consumption in electricity
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface ButtonSelectAllProps {
    isDark: boolean;
    handleButtonSelectAllClick: () => void;
}

const ButtonSelectAll: React.FC<ButtonSelectAllProps> = ({
    isDark,
    handleButtonSelectAllClick,
}) => {
    const { t } = useTranslation();

    return (
        <div>
            <ButtonSelectAllContainer
                isDark={isDark}
                onClick={() => handleButtonSelectAllClick()}
            >
                {t('selectAll')}
            </ButtonSelectAllContainer>
        </div>
    );
};

export default ButtonSelectAll;
