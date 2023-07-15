import * as React from 'react'
import { OptimisationTemplateContainer } from './elements';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {number} y - The y position of the template
*/
interface OptimisationTemplateProps {
    isDark: boolean;
    y: number;
}

const OptimisationTemplate: React.FC<OptimisationTemplateProps> = ({ isDark, y }) => {

    return (
        <OptimisationTemplateContainer isDark={isDark} y={y}>
        </OptimisationTemplateContainer>
    )
}

export default OptimisationTemplate