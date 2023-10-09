import * as React from 'react';
import { useEffect } from 'react';
import {
    OptimisationTemplateContainer,
    TypeText,
    LocationText,
    DescriptionText,
    SolutionTextContainer,
    SolutionText,
} from './elements';

/** Props of the optimisation template
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {number} y - The y position of the template
 * @param {any} optimisationTemplateData - Data of the current child template
 * @param {function} onCheckboxChange - The function to call when the checkbox is clicked
 */
interface OptimisationTemplateProps {
    isDark: boolean;
    y: number;
    optimisationTemplateData: any;
    onTemplateClick: (isChecked: boolean) => void;
}

const OptimisationTemplate: React.FC<OptimisationTemplateProps> = ({
    isDark,
    y,
    optimisationTemplateData,
    onTemplateClick,
}) => {
    const [isChecked, setIsChecked] = React.useState(false);

    useEffect(() => {
        setIsChecked(optimisationTemplateData.selected);
    }, [optimisationTemplateData.selected]);

    const handleTemplateClick = () => {
        const newCheckedValue = !isChecked;
        setIsChecked(newCheckedValue);
        onTemplateClick(newCheckedValue);
    };

    return (
        <OptimisationTemplateContainer
            isDark={isDark}
            y={y}
            onClick={() => handleTemplateClick()}
            checked={isChecked}
        >
            <TypeText isDark={isDark}>{optimisationTemplateData.type}</TypeText>
            <LocationText isDark={isDark}>
                {optimisationTemplateData.location}
            </LocationText>
            <DescriptionText isDark={isDark}>
                {optimisationTemplateData.description}
            </DescriptionText>
            <SolutionTextContainer isDark={isDark}>
                <SolutionText isDark={isDark}>
                    {optimisationTemplateData.solution}
                </SolutionText>
            </SolutionTextContainer>
        </OptimisationTemplateContainer>
    );
};

export default OptimisationTemplate;
