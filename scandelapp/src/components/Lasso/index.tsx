import { useState } from 'react';
import { LassoButton } from './elements';
import { TbLassoPolygon } from 'react-icons/tb';

interface LassoButtonProps {
    id: string;
    isDark: boolean;
    onLassoActivation: (isActive: boolean) => void;
}

const Lasso: React.FC<LassoButtonProps> = ({
    id,
    isDark,
    onLassoActivation,
}) => {
    const [isOn, setIsOn] = useState(false);

    const toggleButton = () => {
        const isActive = !isOn;
        setIsOn(isActive);
        onLassoActivation(isActive);
    };

    return (
        <div id={id}>
            <LassoButton onClick={toggleButton} isDark={isDark} isOn={isOn}>
                <TbLassoPolygon size={30} />
            </LassoButton>
        </div>
    );
};

export default Lasso;
