import { useState } from 'react';
import { LassoButton, ValidateButton } from './elements';
import { TbLassoPolygon } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa';

interface LassoButtonProps {
    id: string;
    isDark: boolean;
    onLassoActivation: (isActive: boolean) => void;
    onLassoValidation: () => void;
}

const Lasso: React.FC<LassoButtonProps> = ({
    id,
    isDark,
    onLassoActivation,
    onLassoValidation,
}) => {
    const [isOn, setIsOn] = useState(false);

    const toggleLassoActivation = () => {
        const isActive = !isOn;
        setIsOn(isActive);
        onLassoActivation(isActive);
    };

    const toggleLassoValidation = () => {
        onLassoValidation();
    };

    return (
        <div id={id}>
            <LassoButton
                onClick={toggleLassoActivation}
                isDark={isDark}
                isOn={isOn}
            >
                <TbLassoPolygon size={30} />
            </LassoButton>
            {isOn && (
                <ValidateButton isDark={isDark} onClick={toggleLassoValidation}>
                    <FaCheck size={30} />
                </ValidateButton>
            )}
        </div>
    );
};

export default Lasso;
