import * as React from 'react'
import { ActionsListContainer, ActionsListButton, ActionsListPanel } from './elements';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
*/
interface ActionsListProps {
    isDark: boolean;
    optimisationTemplateData: any;
}

const ActionsList: React.FC<ActionsListProps> = ({ isDark, optimisationTemplateData }) => {
  const [actionsListExtended, setActionsListExtended] = React.useState(false);

  const handleToggleActionsListExpend = () => {
    setActionsListExtended(!actionsListExtended);
  };

  return (
    <ActionsListContainer>
      <ActionsListButton isDark={isDark} onClick={() => handleToggleActionsListExpend()} >
        Liste des actions
      </ActionsListButton>
      <ActionsListPanel isDark={isDark} show={actionsListExtended}>
        {optimisationTemplateData.map((item: any) => (
          item.saved &&
          (<div>{item.type}</div>)
        ))}
      </ActionsListPanel>
    </ActionsListContainer>
  )
}

export default ActionsList