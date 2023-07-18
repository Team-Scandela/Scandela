import * as React from 'react'
import { useEffect } from 'react';
import { Checkbox, OptimisationTemplateContainer, TypeText } from './elements';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {number} y - The y position of the template
 * @param {any} optimisationTemplateData - Data of the current child template
 * @param {function} onCheckboxChange - The function to call when the checkbox is clicked
*/
interface OptimisationTemplateProps {
  isDark: boolean;
  y: number;
  optimisationTemplateData: any,
  onCheckboxChange: (isChecked: boolean) => void;
}

const OptimisationTemplate: React.FC<OptimisationTemplateProps> = ({
  isDark,
  y,
  optimisationTemplateData,
  onCheckboxChange,
}) => {
  const [isChecked, setIsChecked] = React.useState(false);

  useEffect(() => {
    setIsChecked(optimisationTemplateData.selected);
  }, [optimisationTemplateData.selected]);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    onCheckboxChange(newCheckedValue);
  };

  return (
    <OptimisationTemplateContainer isDark={isDark} y={y}>
      <Checkbox type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <TypeText isDark={isDark}>{optimisationTemplateData.type}</TypeText>
    </OptimisationTemplateContainer>
  );
};

export default OptimisationTemplate;
