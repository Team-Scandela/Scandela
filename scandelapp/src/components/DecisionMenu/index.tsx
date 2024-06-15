import { useState } from 'react';
import {
    DecisionMenuContainer,
    DecisionMenuButton,
    DecisionPanel,
    DecisionMenuButtonsContainer,
    DecisionMenuTabButton,
    TabButtonText,
    DecisionMenuContentContainer,
    LogoContainer,
} from './elements';
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md';
import logoDark from '../../assets/logo-128x128-yellow.png';
import { PiListChecksDuotone } from 'react-icons/pi';
import { MdChangeCircle, MdAddCircle, MdElectricBolt } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import DecisionTab from './DecisionTab';
import ActionsListTab from './ActionsListTab';
import { Tabs } from '../../pages/main';

/** Props of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {function} handleToggleDecisionPanelExtend - Callback function
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} setOptimisationTemplateData - Callback function
 * @param {function} handleButtonSelectAllClick - Callback function
 * @param {function} handleButtonDeselectAllClick - Callback function
 * @param {function} handleCurrentSelectedChange - Callback function
 * @param {string} currentSelected - Current selected optimisation type
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 * @param {any} notificationsPreference - Notifications preference data
 * @param {any} currentTab - Store the current tab displated
 * @param {function} setCurrentTab - Setter for the current tab var
 */
interface DecisionMenuProps {
    id: string;
    isDark: boolean;
    handleToggleDecisionPanelExtend: () => void;
    decisionPanelExtended: any;
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
    handleButtonSelectAllClick: () => void;
    handleButtonDeselectAllClick: () => void;
    handleCurrentSelectedChange: (data: string) => void;
    currentSelected: string;
    addNotificationToList: (description: string) => void;
    notificationsPreference: any;
    currentTab: any;
    setCurrentTab: (value: Tabs) => void;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({
    id,
    isDark,
    handleToggleDecisionPanelExtend,
    decisionPanelExtended,
    optimisationTemplateData,
    setOptimisationTemplateData,
    handleButtonSelectAllClick,
    handleButtonDeselectAllClick,
    handleCurrentSelectedChange,
    currentSelected,
    addNotificationToList,
    notificationsPreference,
    currentTab,
    setCurrentTab,
}) => {
    const [dropdownExpended, setDropdownExpended] = useState(false);
    const { t } = useTranslation();

    const handleDecisionPanelButtonClick = () => {
        handleToggleDecisionPanelExtend();
        if (dropdownExpended) setDropdownExpended(!dropdownExpended);
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
                    <DecisionMenuButtonsContainer isDark={isDark}>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.Scandela}
                            onClick={() => setCurrentTab(Tabs.Scandela)}
                        >
                            {currentTab === Tabs.Scandela ? (
                                <TabButtonText
                                    fontSize={'25px'}
                                    isSelected={currentTab === Tabs.Scandela}
                                >
                                    Scandela
                                </TabButtonText>
                            ) : (
                                <LogoContainer src={logoDark} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.ActionsList}
                            onClick={() => setCurrentTab(Tabs.ActionsList)}
                        >
                            {currentTab === Tabs.ActionsList ? (
                                <TabButtonText
                                    fontSize={'22px'}
                                    isSelected={currentTab === Tabs.ActionsList}
                                >
                                    Liste des actions
                                </TabButtonText>
                            ) : (
                                <PiListChecksDuotone size={35} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.ModifLamp}
                            onClick={() => setCurrentTab(Tabs.ModifLamp)}
                        >
                            {currentTab === Tabs.ModifLamp ? (
                                <TabButtonText
                                    fontSize={'20px'}
                                    isSelected={currentTab === Tabs.ModifLamp}
                                >
                                    Modifier un lampadaire
                                </TabButtonText>
                            ) : (
                                <MdChangeCircle size={35} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.AddLamp}
                            onClick={() => setCurrentTab(Tabs.AddLamp)}
                        >
                            {currentTab === Tabs.AddLamp ? (
                                <TabButtonText
                                    fontSize={'20px'}
                                    isSelected={currentTab === Tabs.AddLamp}
                                >
                                    Ajouter un lampdaire
                                </TabButtonText>
                            ) : (
                                <MdAddCircle size={35} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.ElectricityPrice}
                            onClick={() => setCurrentTab(Tabs.ElectricityPrice)}
                        >
                            {currentTab === Tabs.ElectricityPrice ? (
                                <TabButtonText
                                    fontSize={'20px'}
                                    isSelected={
                                        currentTab === Tabs.ElectricityPrice
                                    }
                                >
                                    Prix de l'électricité
                                </TabButtonText>
                            ) : (
                                <MdElectricBolt size={35} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.Options}
                            onClick={() => setCurrentTab(Tabs.Options)}
                        >
                            {currentTab === Tabs.Options ? (
                                <TabButtonText
                                    fontSize={'25px'}
                                    isSelected={currentTab === Tabs.Options}
                                >
                                    Options
                                </TabButtonText>
                            ) : (
                                <IoMdSettings size={35}></IoMdSettings>
                            )}
                        </DecisionMenuTabButton>
                    </DecisionMenuButtonsContainer>
                    <DecisionMenuContentContainer
                        isDark={isDark}
                        currentTab={currentTab}
                    >
                        {currentTab === Tabs.Scandela && (
                            <DecisionTab
                                isDark={isDark}
                                optimisationTemplateData={
                                    optimisationTemplateData
                                }
                                setOptimisationTemplateData={
                                    setOptimisationTemplateData
                                }
                                handleButtonSelectAllClick={
                                    handleButtonSelectAllClick
                                }
                                handleButtonDeselectAllClick={
                                    handleButtonDeselectAllClick
                                }
                                currentSelected={currentSelected}
                                handleCurrentSelectedChange={
                                    handleCurrentSelectedChange
                                }
                                addNotificationToList={addNotificationToList}
                                notificationsPreference={
                                    notificationsPreference
                                }
                                dropdownExpended={dropdownExpended}
                                setDropdownExpended={setDropdownExpended}
                            />
                        )}
                        {currentTab === Tabs.ActionsList && (
                            <ActionsListTab
                                isDark={isDark}
                                optimisationTemplateData={
                                    optimisationTemplateData
                                }
                                setOptimisationTemplateData={
                                    setOptimisationTemplateData
                                }
                            />
                        )}
                        {/* {currentTab === Tabs.ModifLamp && (

                        )}
                        {currentTab === Tabs.AddLamp && (

                        )}
                        {currentTab === Tabs.ElectricityPrice && (

                        )}
                        {currentTab === Tabs.Options && (

                        )} */}
                    </DecisionMenuContentContainer>
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    );
};

export default DecisionMenu;
