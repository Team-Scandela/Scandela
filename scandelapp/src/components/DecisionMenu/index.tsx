import * as React from "react";
import {
    DecisionMenuContainer,
    DecisionMenuButton,
    DecisionPanel,
    DecisionPanelContentContainer,
    LogoContainer,
    ScandelaText,
    DropdownContainer,
    DropdownRoundButton,
    DropdownMenu,
    DropdownItem,
} from "./elements";
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from "react-icons/md";
import { MdKeyboardArrowDown as DropdownButtonIconOpen } from "react-icons/md";
import { MdKeyboardArrowUp as DropdownButtonIconClose } from "react-icons/md";
import ButtonEditInPdf from "../ButtonEditInPdf";
import ButtonSelectAll from "../ButtonSelectAll";
import logoDark from "../../assets/logo-128x128-yellow.png";

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 */
interface DecisionMenuProps {
    id: string;
    isDark: boolean;
    isButtonEditInPdfClicked: boolean;
    handleButtonEditInPdfClick: () => void;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({
    id,
    isDark,
    handleButtonEditInPdfClick,
    isButtonEditInPdfClicked,
}) => {
    /** If the decision pannel is open or closed */
    const [decisionPanelExtended, setDecisionPanelExtended] =
        React.useState(false);
    const [dropdownExpended, setDropdownExpended] = React.useState(false);
    const [currentSelected, setCurrentSelected] = React.useState(
        "Choisissez une action",
    );
    const [items, setItems] = React.useState([
        "Éteindre lampadaire",
        "Allumer lampadaire",
        "Augmenter intensité lampadaire",
        "Réduire intensité lampadaire",
        "Changer ampoule lampadaire",
        "Ajouter lampadaire",
        "Retirer lampadaire",
        "Lampadaire intelligent",
    ]);

    const handleToggleDecisionPanelExpend = () => {
        setDecisionPanelExtended(!decisionPanelExtended);
        if (dropdownExpended) handleToggleDropdownExpend();
    };

    const handleToggleDropdownExpend = () => {
        setDropdownExpended(!dropdownExpended);
    };

    const handleItemClick = (item: string) => {
        setCurrentSelected(item);
        handleToggleDropdownExpend();
    };

    return (
        <div id={id}>
            <DecisionMenuContainer>
                <DecisionMenuButton
                    onClick={() => handleToggleDecisionPanelExpend()}
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
                    <ButtonEditInPdf
                        isDark={isDark}
                        handleClick={handleButtonEditInPdfClick}
                        isClicked={isButtonEditInPdfClicked}
                    />
                    <ButtonSelectAll isDark={isDark} />
                    <DecisionPanelContentContainer>
                        <DropdownContainer
                            isDark={isDark}
                            onClick={handleToggleDropdownExpend}
                        >
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
                                {items.map((item) => (
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
                    </DecisionPanelContentContainer>
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    );
};

export default DecisionMenu;
