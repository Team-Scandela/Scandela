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
    const [on, setOn] = React.useState(false);

    return (
        <div id={id}>
            <LassoButton onClick={() => setOn(!on)} isDark={isDark}>
                <TbLassoPolygon size={30}/>
            </LassoButton>
        </div>
    );
};

export default Lasso;
