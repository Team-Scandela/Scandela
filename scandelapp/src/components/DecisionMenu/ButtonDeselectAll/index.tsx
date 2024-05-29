import { ButtonDeselectAllContainer, DeselectAllIcon } from './elements';

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
    return (
        <div>
            <ButtonDeselectAllContainer
                isDark={isDark}
                onClick={() => handleButtonDeselectAllClick()}
            >
                <DeselectAllIcon isDark={isDark} />
            </ButtonDeselectAllContainer>
        </div>
    );
};

export default ButtonDeselectAll;
