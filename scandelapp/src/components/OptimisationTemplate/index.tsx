import * as React from 'react'
import { Checkbox, OptimisationTemplateContainer } from './elements';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {number} y - The y position of the template
 * @param {function} onCheckboxChange - The function to call when the checkbox is clicked
*/
interface OptimisationTemplateProps {
  isDark: boolean;
  y: number;
  onCheckboxChange: (isChecked: boolean) => void;
}

const OptimisationTemplate: React.FC<OptimisationTemplateProps> = ({
  isDark,
  y,
  onCheckboxChange,
}) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    onCheckboxChange(newCheckedValue);
  };

  return (
    <OptimisationTemplateContainer isDark={isDark} y={y}>
      <Checkbox type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    </OptimisationTemplateContainer>
  );
};

export default OptimisationTemplate;
