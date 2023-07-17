import * as React from 'react'
import { ActionsListContainer, ActionsListButton, ActionsListPanel } from './elements';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
*/
interface ActionsListProps {
    isDark: boolean;
}

const ActionsList: React.FC<ActionsListProps> = ({ isDark }) => {
  const [actionsListExtended, setActionsListExtended] = React.useState(false);

  const handleToggleActionsListExpend = () => {
    setActionsListExtended(!actionsListExtended);
  };

  return (
    <ActionsListContainer>
      <ActionsListButton isDark={isDark} onClick={() => handleToggleActionsListExpend()} >
        Liste des actions
      </ActionsListButton>
      <ActionsListPanel isDark={isDark} show={actionsListExtended}></ActionsListPanel>
    </ActionsListContainer>
  )
}

export default ActionsList