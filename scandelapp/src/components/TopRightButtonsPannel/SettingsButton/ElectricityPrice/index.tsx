import { useState, useEffect } from 'react';
import {
    ElectricityPriceButton,
    PriceLimitInput,
    PriceLimitCreationButton,
    PriceLimitContainer,
    PriceLimitValidationButton,
    PriceLimitDeleteButton,
    DescriptionText,
} from './elements';
import {
    getElectricityPrice,
    getPriceLimit,
    createPriceLimit,
    deletePriceLimit,
} from '../../../../utils/priceLimitUtils';

/** EletricityPrice setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface EletricityPriceProps {
    isDark: boolean;
}

const EletricityPrice: React.FC<EletricityPriceProps> = ({ isDark }) => {
    const [currentElectricityPrice, setCurrentElectricityPrice] = useState(0);
    const [currentPriceLimit, setCurrentPriceLimit] = useState('');
    const [tripleState, setTripleState] = useState(1);

    useEffect(() => {
        const getElectricityPriceAsync = async () => {
            const price = await getElectricityPrice();
            setCurrentElectricityPrice(price);
        };
        const getPriceLimitAsync = async () => {
            const pricelimit = await getPriceLimit();
            if (pricelimit.error && pricelimit.error === 'Not Found') {
                console.log('Not found');
            } else {
                setCurrentPriceLimit(pricelimit.value);
                setTripleState(3);
            }
        };
        getElectricityPriceAsync();
        getPriceLimitAsync();
    }, []);

    const getLimitSide = () => {
        if (parseFloat(currentPriceLimit) < currentElectricityPrice)
            return 'DOWN';
        else if (parseFloat(currentPriceLimit) > currentElectricityPrice)
            return 'UP';
        return;
    };

    const handleLimitCreationButton = () => {
        setTripleState(2);
    };

    const handleValidateButton = () => {
        if (currentPriceLimit === '' || !parseFloat(currentPriceLimit)) return;
        createPriceLimit(parseFloat(currentPriceLimit), getLimitSide());
        setTripleState(3);
    };

    const handleDeleteButton = () => {
        const getPriceLimitAsync = async () => {
            const pricelimit = await getPriceLimit();
            deletePriceLimit(pricelimit.id);
        };
        setCurrentPriceLimit('');
        getPriceLimitAsync();
        setTripleState(1);
    };

    return (
        <div>
            <ElectricityPriceButton isDark={isDark}>
                {currentElectricityPrice === 0
                    ? 'Chargement ...'
                    : currentElectricityPrice + ' € / MW / H'}
            </ElectricityPriceButton>
            {tripleState === 1 && (
                <PriceLimitCreationButton
                    isDark={isDark}
                    onClick={() => handleLimitCreationButton()}
                >
                    Créer un limite de prix
                </PriceLimitCreationButton>
            )}
            {tripleState === 2 && (
                <div>
                    <PriceLimitInput
                        id="pricelimitInputBox"
                        type="number"
                        placeholder="Limite de prix"
                        value={currentPriceLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCurrentPriceLimit(e.target.value)
                        }
                    />
                    <PriceLimitValidationButton
                        isDark={isDark}
                        onClick={() => handleValidateButton()}
                    >
                        Valider
                    </PriceLimitValidationButton>
                </div>
            )}
            {tripleState === 3 && (
                <div>
                    <PriceLimitContainer isDark={isDark}>
                        {currentPriceLimit + ' €'}
                    </PriceLimitContainer>
                    <PriceLimitDeleteButton
                        isDark={isDark}
                        onClick={() => handleDeleteButton()}
                    >
                        Supprimer
                    </PriceLimitDeleteButton>
                </div>
            )}
            <DescriptionText>
                Vous avez la possibilité de renseigner une limite de prix haute
                ou basse afin d'être notifié par mail quand le prix de
                l'électricité dépassera ce seuil.
            </DescriptionText>
        </div>
    );
};

export default EletricityPrice;
