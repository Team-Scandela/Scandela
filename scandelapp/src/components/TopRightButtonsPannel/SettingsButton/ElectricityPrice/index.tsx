import { useState, useEffect } from 'react';
import { ElectricityPriceButton, PriceLimitInput, PriceLimitValidationButton } from './elements';
import { getElectricityPrice, getPriceLimit, createPriceLimit } from "../../../../utils/priceLimitUtils";

/** EletricityPrice setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface EletricityPriceProps {
    isDark: boolean;
}

const EletricityPrice: React.FC<EletricityPriceProps> = ({ isDark }) => {
    const [currentElectricityPrice, setCurrentElectricityPrice] = useState(0);
    const [currentPriceLimit, setCurrentPriceLimit] = useState(null);

    useEffect(() => {
        const getElectricityPriceAsync = async () => {
            const price = await getElectricityPrice();
            setCurrentElectricityPrice(price);
        }
        getElectricityPriceAsync();
    }, []);

    const handleValidateButton = () => {
        console.log("here");
        console.log(getPriceLimit());
    }

    return (
        <div>
            <ElectricityPriceButton isDark={isDark}>
                {currentElectricityPrice === 0 ? "Loading ..." : (currentElectricityPrice + " € / MW / H")}
            </ElectricityPriceButton>
            <PriceLimitInput
                id="pricelimitInputBox"
                type="number"
                placeholder="Price limit"
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
