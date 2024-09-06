import React, { useState } from 'react';
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
import ModifyEntityTab from './ModifyEntityTab';
import AddEntityTab from './AddEntityTab';
import EletricityPriceTab from './ElectricityPriceTab';
import { Tooltip } from 'react-tooltip';
import { Black } from '../../colors';
import SettingsTab from './SettingsTab';
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
 * @param {boolean} tooltipPreference - Boolean to check if the tooltips are displayed
 * @param {function} setTooltipPreference - Setter function for the tooltipPreference boolean
 * @param {any} currentTab - Store the current tab displated
 * @param {function} setCurrentTab - Setter for the current tab var
 * @param {function} setShowTutoriel - Setter for the showTutoriel var
 */
interface DecisionMenuProps {
    id: string;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
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
    setNotificationsPreference: (item: any) => void;
    tooltipPreference: boolean;
    setTooltipPreference: (value: boolean) => void;
    currentTab: any;
    setCurrentTab: (value: Tabs) => void;
    setShowTutoriel: (value: boolean) => void;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({
    id,
    isDark,
    setIsDark,
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
    setNotificationsPreference,
    tooltipPreference,
    setTooltipPreference,
    currentTab,
    setCurrentTab,
    setShowTutoriel,
}) => {
    const [dropdownExpended, setDropdownExpended] = useState(false);
    const { t } = useTranslation();

    const handleDecisionPanelButtonClick = () => {
        handleToggleDecisionPanelExtend();
        if (dropdownExpended) setDropdownExpended(!dropdownExpended);
    };

    return (
        <div id={id}>
            {tooltipPreference && (
                <Tooltip
                    id="actionPanel"
                    style={{
                        backgroundColor: Black,
                        borderRadius: '5px',
                        userSelect: 'none',
                    }}
                />
            )}
            <DecisionMenuContainer show={decisionPanelExtended}>
                <DecisionMenuButton
                    onClick={() => handleDecisionPanelButtonClick()}
                    isDark={isDark}
                    show={decisionPanelExtended}
                    data-tooltip-id="actionPanel"
                    data-tooltip-content={t('actionPanel')}
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
                                    {t('listActions')}
                                </TabButtonText>
                            ) : (
                                <PiListChecksDuotone size={35} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.ModifEntity}
                            onClick={() => setCurrentTab(Tabs.ModifEntity)}
                        >
                            {currentTab === Tabs.ModifEntity ? (
                                <TabButtonText
                                    fontSize={'20px'}
                                    isSelected={currentTab === Tabs.ModifEntity}
                                >
                                    {t('titleModifyEntityPannel')}
                                </TabButtonText>
                            ) : (
                                <MdChangeCircle size={35} />
                            )}
                        </DecisionMenuTabButton>
                        <DecisionMenuTabButton
                            isDark={isDark}
                            isSelected={currentTab === Tabs.AddEntity}
                            onClick={() => setCurrentTab(Tabs.AddEntity)}
                        >
                            {currentTab === Tabs.AddEntity ? (
                                <TabButtonText
                                    fontSize={'20px'}
                                    isSelected={currentTab === Tabs.AddEntity}
                                >
                                    {t('titleAddEntityPannel')}
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
                                    {t('electricityPrice')}
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
                                    {t('options')}
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
                                    ? optimisationTemplateData.map(
                                          (item: any, i: number) => (
                                              <OptimisationTemplate
                                                  key={i}
                                                  isDark={isDark}
                                                  y={100 * i}
                                                  optimisationTemplateData={
                                                      item
                                                  }
                                                  onTemplateClick={(
                                                      isChecked
                                                  ) =>
                                                      handleChildCheckboxChange(
                                                          item.id,
                                                          isChecked
                                                      )
                                                  }
                                              />
                                          )
                                      )
                                    : optimisationTemplateData
                                          .filter(
                                              (item: any) =>
                                                  item.type === currentSelected
                                          )
                                          .map((item: any, i: number) => (
                                              <OptimisationTemplate
                                                  key={i}
                                                  isDark={isDark}
                                                  y={110 * i}
                                                  optimisationTemplateData={
                                                      item
                                                  }
                                                  onTemplateClick={(
                                                      isChecked
                                                  ) =>
                                                      handleChildCheckboxChange(
                                                          item.id,
                                                          isChecked
                                                      )
                                                  }
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
