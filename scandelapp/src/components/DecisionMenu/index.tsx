import { useState } from 'react';
import {
    DecisionMenuContainer,
    DecisionMenuButton,
    DecisionPanel,
    DecisionPanelContentContainer,
    DecisionPanelContentArrow,
    LogoContainer,
    ScandelaText,
    DropdownContainer,
    DropdownRoundButton,
    DropdownMenu,
    DropdownItem,
    ScrollableOptimisationsContainer,
    AddToActionsListButton,
} from './elements';
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md';
import { MdKeyboardArrowDown as DropdownButtonIconOpen } from 'react-icons/md';
import { MdKeyboardArrowUp as DropdownButtonIconClose } from 'react-icons/md';
import ButtonSelectAll from './ButtonSelectAll';
import ButtonDeselectAll from './ButtonDeselectAll';
import { CgPlayListCheck, CgPlayListRemove } from 'react-icons/cg';
import logoDark from '../../assets/logo-128x128-yellow.png';
import OptimisationTemplate from '../OptimisationTemplate';
import { showToast } from '../Toastr';
import { useTranslation } from 'react-i18next';
import { PersonnalizedGauge } from '../Gauges';
import { GaugesContainer } from '../TopRightButtonsPannel/ActionsList/elements';
import { createNotification } from '../../utils/notificationUtils';

/** Props of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {function} handleToggleDecisionPanelExtend - Callback function
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {function} handleOptimisationTemplateDataChange - Callback function
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} handleButtonSelectAllClick - Callback function
 * @param {function} handleButtonDeselectAllClick - Callback function
 * @param {function} handleCurrentSelectedChange - Callback function
 * @param {string} currentSelected - Current selected optimisation type
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 * @param {any} notificationsPreference - Notifications preference data
 */
interface DecisionMenuProps {
    id: string;
    isDark: boolean;
    handleToggleDecisionPanelExtend: () => void;
    decisionPanelExtended: any;
    handleOptimisationTemplateDataChange: (data: any) => void;
    optimisationTemplateData: any;
    handleButtonSelectAllClick: () => void;
    handleButtonDeselectAllClick: () => void;
    handleCurrentSelectedChange: (data: string) => void;
    currentSelected: string;
    addNotificationToList: (description: string) => void;
    notificationsPreference: any;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({
    id,
    isDark,
    handleToggleDecisionPanelExtend,
    decisionPanelExtended,
    handleOptimisationTemplateDataChange,
    optimisationTemplateData,
    handleButtonSelectAllClick,
    handleButtonDeselectAllClick,
    handleCurrentSelectedChange,
    currentSelected,
    addNotificationToList,
    notificationsPreference,
}) => {
    const [dropdownExpended, setDropdownExpended] = useState(false);
    const [items, setItems] = useState([]);
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const { t } = useTranslation();

    const handleChildCheckboxChange = (id: number, isChecked: boolean) => {
        const updatedData = [...optimisationTemplateData];
        updatedData[id].selected = isChecked;
        handleOptimisationTemplateDataChange(updatedData);
    };

    const handleDecisionPanelButtonClick = () => {
        handleToggleDecisionPanelExtend();
        if (dropdownExpended) handleToggleDropdownExpend();
    };

    // Fill the items array with one of each types from the optimisationTemplateData
    const handleToggleDropdownExpend = () => {
        const uniqueTypes = optimisationTemplateData.reduce(
            (types: any, item: any) => {
                if (!types.has(item.type)) {
                    types.add(item.type);
                }
                return types;
            },
            new Set()
        );
        const uniqueArray = Array.from(uniqueTypes);
        uniqueArray.unshift('Toutes les optimisations');
        setItems(uniqueArray);
        setDropdownExpended(!dropdownExpended);
    };

    const handleItemClick = (item: string) => {
        handleCurrentSelectedChange(item);
        handleToggleDropdownExpend();
    };

    const handleActionsListButtonClick = async () => {
        let itemsUpdated = 0;
        if (isOnCooldown) return;
        const updatedData = [...optimisationTemplateData];
        updatedData.forEach((item: any) => {
            if (item.selected) {
                if (!item.saved) itemsUpdated++;
                item.saved = true;
            }
        });
        handleOptimisationTemplateDataChange(updatedData);
        if (itemsUpdated === 0) {
            if (
                !notificationsPreference.find(
                    (item: any) => item[0] === 'actionListUpdate'
                )[1]
            )
                showToast(
                    'error',
                    "Il n'y a rien à ajouter dans la liste d'action",
                    'top-left',
                    5000,
                    false,
                    true,
                    false,
                    true
                );
                
            const userId = localStorage.getItem('userId');
            if (userId) {
                await createNotification({
                    userId,
                    title: t('actionListFailedUpdate'),
                    description: t('theActionListHasntBeenSuccessfullyUpdated'),
                    triggered: true,
                });
            }
            // addNotificationToList("Echec de modification de la liste d'action");
        } else if (itemsUpdated > 0) {
            if (
                !notificationsPreference.find(
                    (item: any) => item[0] === 'actionListUpdate'
                )[1]
            )
                console.log(itemsUpdated);
            showToast(
                'success',
                'La liste des actions a bien été mise à jour',
                'top-left',
                5000,
                false,
                true,
                false,
                true
            );

            const userId = localStorage.getItem('userId');
            if (userId) {
                await createNotification({
                    userId,
                    title: t('actionListUpdate'),
                    description: t('theActionListHasBeenSuccessfullyUpdated'),
                    triggered: true,
                });
            }
           // addNotificationToList("Mise à jour de la liste d'action");
        }
        setIsOnCooldown(true);
        setTimeout(() => {
            setIsOnCooldown(false);
        }, 5000);
    };

    return (
        <div id={id}>
            <DecisionMenuContainer show={decisionPanelExtended}>
                <DecisionMenuButton
                    onClick={() => handleDecisionPanelButtonClick()}
                    isDark={isDark}
                    show={decisionPanelExtended}
                >
                    {decisionPanelExtended ? (
                        <DecisionIconRight size={50} />
                    ) : (
                        <DecisionIconLeft size={50} />
                    )}
                </DecisionMenuButton>
                <DecisionPanel isDark={isDark} show={decisionPanelExtended}>
                    <ScandelaText isDark={isDark}> Scandela </ScandelaText>
                    <ButtonSelectAll
                        isDark={isDark}
                        handleButtonSelectAllClick={handleButtonSelectAllClick}
                    />
                    <ButtonDeselectAll
                        isDark={isDark}
                        handleButtonDeselectAllClick={
                            handleButtonDeselectAllClick
                        }
                    />
                    <DecisionPanelContentArrow isDark={isDark} />
                    <DecisionPanelContentContainer>
                        <DropdownContainer isDark={isDark}>
                            {currentSelected}
                            <DropdownRoundButton
                                onClick={() => handleToggleDropdownExpend()}
                                isDark={isDark}
                            >
                                {dropdownExpended ? (
                                    <DropdownButtonIconClose size={40} />
                                ) : (
                                    <DropdownButtonIconOpen size={40} />
                                )}
                            </DropdownRoundButton>
                        </DropdownContainer>
                        {dropdownExpended && (
                            <DropdownMenu isDark={isDark}>
                                {items.map((item: any) => (
                                    <DropdownItem
                                        key={item}
                                        isDark={isDark}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                        <LogoContainer src={logoDark} />
                        {currentSelected !== 'Choisissez une action' && (
                            <ScrollableOptimisationsContainer isDark={isDark}>
                            {currentSelected === 'Toutes les optimisations'
                                ? optimisationTemplateData.map((item: any, i: number) => (
                                      <OptimisationTemplate
                                          key={i}
                                          isDark={isDark}
                                          y={125 * i}
                                          optimisationTemplateData={item}
                                        onTemplateClick={(isChecked) =>
                                            handleChildCheckboxChange(item.id, isChecked)
                                        }
                                        price={item.price} // Assurez-vous que item.price est correctement défini dans votre data
                                    />
                                  ))
                                : optimisationTemplateData
                                      .filter((item: any) => item.type === currentSelected)
                                      .map((item: any, i: number) => (
                                          <OptimisationTemplate
                                              key={i}
                                              isDark={isDark}
                                              y={125 * i}
                                              optimisationTemplateData={item}
                                              onTemplateClick={(isChecked) =>
                                                  handleChildCheckboxChange(item.id, isChecked)
                                              }
                                              price={item.price} // Ajoutez la propriété price ici
                                          />
                                      ))}
                        </ScrollableOptimisationsContainer>
                        )}
                        <AddToActionsListButton
                            isDark={isDark}
                            onClick={() => handleActionsListButtonClick()}
                            disabled={isOnCooldown}
                        >
                            {t('addToActionList')}
                        </AddToActionsListButton>
                    </DecisionPanelContentContainer>
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    );
};

export default DecisionMenu;
