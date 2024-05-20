import { useState, useEffect } from 'react';
import { ElectricityPriceButton, PriceLimitInput, PriceLimitValidationButton } from './elements';
import { getElectricityPrice, getAllPriceLimit, getPriceLimit, createPriceLimit, deletePriceLimit } from "../../../../utils/priceLimitUtils";

/** EletricityPrice setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface EletricityPriceProps {
    isDark: boolean;
}

const EletricityPrice: React.FC<EletricityPriceProps> = ({ isDark }) => {
    const [currentElectricityPrice, setCurrentElectricityPrice] = useState(0);
    const [currentPriceLimit, setCurrentPriceLimit] = useState('');

    useEffect(() => {
        const getElectricityPriceAsync = async () => {
            const price = await getElectricityPrice();
            setCurrentElectricityPrice(price);
        }
        getElectricityPriceAsync();
    }, []);

    const getLimitSide = () => {
        if (parseFloat(currentPriceLimit) < currentElectricityPrice)
            return "DOWN";
        else if (parseFloat(currentPriceLimit) > currentElectricityPrice)
            return "UP";
        return;
    };

    const handleValidateButton = () => {
        // createPriceLimit(parseFloat(currentPriceLimit), getLimitSide());
        // deletePriceLimit("29335b71634c-488a-b586-4074d480824d");
        getPriceLimit();
    };

    return (
        <div>
            <ElectricityPriceButton isDark={isDark}>
                {currentElectricityPrice === 0 ? "Chargement ..." : (currentElectricityPrice + " € / MW / H")}
            </ElectricityPriceButton>
            <PriceLimitInput
                id="pricelimitInputBox"
                type="number"
                placeholder="Créer une limite de prix"
                value={currentPriceLimit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentPriceLimit(e.target.value)
                }
            />
            <PriceLimitValidationButton isDark={isDark} onClick={() => handleValidateButton()}>Valider</PriceLimitValidationButton>
        </div>
    );
};

export default EletricityPrice;
