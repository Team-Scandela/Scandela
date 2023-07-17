import * as React from 'react'
import { DecisionMenuContainer, DecisionMenuButton, DecisionPanel, DecisionPanelContentContainer,
LogoContainer, ScandelaText, DropdownContainer, DropdownRoundButton, DropdownMenu, DropdownItem,
ScrollableOptimisationsContainer, AddToActionsListButton } from './elements'
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md'
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md'
import { MdKeyboardArrowDown as DropdownButtonIconOpen } from 'react-icons/md'
import { MdKeyboardArrowUp as DropdownButtonIconClose } from 'react-icons/md'
import ButtonEditInPdf from '../ButtonEditInPdf'
import ButtonSelectAll from '../ButtonSelectAll'
import logoDark from '../../assets/logo-128x128-yellow.png'
import OptimisationTemplate from '../OptimisationTemplate'


/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
*/
interface DecisionMenuProps {
    isDark: boolean;
    isButtonEditInPdfClicked: boolean;
    handleButtonEditInPdfClick: () => void;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({ isDark, handleButtonEditInPdfClick, isButtonEditInPdfClicked }) => {
    /** If the decision pannel is open or closed */
    const [decisionPanelExtended, setDecisionPanelExtended] = React.useState(false);
    const [dropdownExpended, setDropdownExpended] = React.useState(false);
    const [currentSelected, setCurrentSelected] = React.useState('Choisissez une action');
    const [items] = React.useState(["Toutes les optimisations", "Éteindre lampadaire", "Allumer lampadaire", "Augmenter intensité lampadaire",
    "Réduire intensité lampadaire", "Changer ampoule lampadaire", "Ajouter lampadaire", "Retirer lampadaire", "Lampadaire intelligent"]);
    const [childStates, setChildStates] = React.useState([false, false, false, false, false, false, false, false, false, false]);


    const handleChildCheckboxChange = (index: number, isChecked: boolean) => {
        const updatedStates = [...childStates];
        updatedStates[index] = isChecked;
        setChildStates(updatedStates);
        console.log(childStates)
    };

    const handleToggleDecisionPanelExpend = () => {
        setDecisionPanelExtended(!decisionPanelExtended);
        if (dropdownExpended)
            handleToggleDropdownExpend();
    };

    const handleToggleDropdownExpend = () => {
        setDropdownExpended(!dropdownExpended);
    };

    const handleItemClick = (item: string) => {
        setCurrentSelected(item);
        handleToggleDropdownExpend();
    };

    return (
        <div>
            <DecisionMenuContainer>
                <DecisionMenuButton onClick={() => handleToggleDecisionPanelExpend()} isDark={isDark} show={decisionPanelExtended}>
                    {decisionPanelExtended ? <DecisionIconRight size={50}/> : <DecisionIconLeft size={50}/>}
                </DecisionMenuButton>
                <DecisionPanel isDark={isDark} show={decisionPanelExtended}>
                    <ScandelaText isDark={isDark}> Scandela </ScandelaText>
                    <ButtonEditInPdf isDark={isDark} handleClick={handleButtonEditInPdfClick} isClicked={isButtonEditInPdfClicked}/>
                    <ButtonSelectAll isDark={isDark} />
                    <DecisionPanelContentContainer>
                        <DropdownContainer isDark={isDark}>
                            {currentSelected}
                            <DropdownRoundButton onClick={() => handleToggleDropdownExpend()} isDark={isDark}>
                                {dropdownExpended ? <DropdownButtonIconClose size={40}/> : <DropdownButtonIconOpen size={40}/>}
                            </DropdownRoundButton>
                        </DropdownContainer>
                        {dropdownExpended && (
                            <DropdownMenu isDark={isDark}>
                                {items.map((item) => (
                                    <DropdownItem key={item} isDark={isDark} onClick={() => handleItemClick(item) }>{item}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                        <LogoContainer src={logoDark} />
                        {currentSelected !== "Choisissez une action" && (
                            <ScrollableOptimisationsContainer isDark={isDark}>
                                {Array.from(Array(childStates.length).keys()).map((i) => (
                                    <OptimisationTemplate key={i} isDark={isDark} y={90*i}
                                    onCheckboxChange={(isChecked) => handleChildCheckboxChange(i, isChecked)}/>
                                ))}
                            </ScrollableOptimisationsContainer>
                        )}
                        <AddToActionsListButton isDark={isDark}>Ajouter à la liste d'actions</AddToActionsListButton>
                    </DecisionPanelContentContainer>
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    )
}

export default DecisionMenu
