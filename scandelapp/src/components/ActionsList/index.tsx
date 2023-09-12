import * as React from 'react'
import { useEffect } from 'react';
import { ActionsListContainer, ActionsListButton, ActionsListPanel, ScrollableOptimisationsContainer, OptimisationTemplateContainer, TypeText } from './elements';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel if extended or not 
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
*/
interface ActionsListProps {
    isDark: boolean;
    decisionPanelExtended: boolean;
    optimisationTemplateData: any;
}

const ActionsList: React.FC<ActionsListProps> = ({ isDark, decisionPanelExtended, optimisationTemplateData }) => {
  const [actionsListExtended, setActionsListExtended] = React.useState(false);

  useEffect(() => {
    if (decisionPanelExtended && actionsListExtended)
      handleToggleActionsListExpend();
  });

  const handleToggleActionsListExpend = () => {
    setActionsListExtended(!actionsListExtended);
  };

  return (
    <ActionsListContainer>
      <ActionsListButton isDark={isDark} onClick={() => handleToggleActionsListExpend()} >
        Liste des actions
      </ActionsListButton>
      <ActionsListPanel isDark={isDark} show={actionsListExtended}>
        <ScrollableOptimisationsContainer isDark={isDark}>
        {optimisationTemplateData
          .filter((item: any) => item.saved)
          .map((item: any, i: number) => (
            <OptimisationTemplateContainer
                key={i}
                isDark={isDark}
                y={100 * i}
            >
              <TypeText isDark={isDark}>{item.type}</TypeText>
            </OptimisationTemplateContainer>
          ))}
        </ScrollableOptimisationsContainer>
      </ActionsListPanel>
    </ActionsListContainer>
  )
}

export default ActionsList