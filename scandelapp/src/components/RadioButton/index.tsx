import * as React from 'react';
import { MainContainer, ButtonContainer } from './elements';

/** Props of the toastr component
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {int} top - y
 * @param {int} left - x
 * @param {boolean} trigger - on/off boolean linked to the parent button
 * @param {function} setTrigger - setter
 */
interface RadioButtonProps {
    isDark: boolean;
    top: any;
    left: any;
    trigger: boolean;
    setTrigger: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
    isDark,
    top,
    left,
    trigger,
    setTrigger,
}) => {
    const handleTriggerToggle = () => {
        setTrigger();
    };

    return (
        <div>
            <MainContainer isDark={isDark} top={top} left={left}>
                <ButtonContainer
                    isDark={isDark}
                    trigger={trigger}
                    onClick={handleTriggerToggle}
                />
            </MainContainer>
        </div>
    );
};

export default RadioButton;
