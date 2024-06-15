import { ButtonSelectAllContainer, SelectAllIcon } from './elements';

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
    return (
        <div>
            <ButtonSelectAllContainer
                isDark={isDark}
                onClick={() => handleButtonSelectAllClick()}
            >
                <SelectAllIcon isDark={isDark} />
            </ButtonSelectAllContainer>
        </div>
    );
};

export default ButtonSelectAll;
