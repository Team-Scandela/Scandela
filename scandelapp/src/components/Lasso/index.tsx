import * as React from 'react';
import { LassoButton } from './elements';
import { TbLassoPolygon } from 'react-icons/tb';

interface LassoButtonProps {
    id: string;
    isDark: boolean;
}

const Lasso: React.FC<LassoButtonProps> = ({
    id,
    isDark,
}) => {
    const [isOn, setIsOn] = React.useState(false);

    const toggleButton = () => {
        setIsOn(!isOn);
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