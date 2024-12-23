import { useState, useEffect } from 'react';
import {
    ContentContainer,
    ElectricityPriceDisplay,
    PriceLimitInput,
    PriceLimitCreationButton,
    PriceLimitContainer,
    PriceLimitValidationButton,
    PriceLimitDeleteButton,
    DescriptionText,
    SourceButtonContainer,
    LinkIcon,
} from './elements';
import {
    getElectricityPrice,
    getPriceLimit,
    createPriceLimit,
    deletePriceLimit,
} from '../../../utils/priceLimitUtils';
import { useTranslation } from 'react-i18next';

/** EletricityPriceTab setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface EletricityPriceTabProps {
    isDark: boolean;
}

const EletricityPriceTab: React.FC<EletricityPriceTabProps> = ({ isDark }) => {
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
        try {
            getElectricityPriceAsync();
            getPriceLimitAsync();
        } catch (error) {
            console.log(
                'ERROR GET ELECTRICITY PRICE AND PRICE LIMIT = ' + error
            );
        }
    }, []);

    const { t } = useTranslation();

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

    const handleSourceButtonClick = () => {
        window.open("https://www.rte-france.com/eco2mix/les-donnees-de-marche", "_blank");
    };

    return (
        <div>
            <ContentContainer isDark={isDark}>
                <ElectricityPriceDisplay isDark={isDark}>
                    {currentElectricityPrice === 0
                        ? t('loading')
                        : currentElectricityPrice + ' € / MW / H'}
                </ElectricityPriceDisplay>
                {tripleState === 1 && (
                    <PriceLimitCreationButton
                        isDark={isDark}
                        onClick={() => handleLimitCreationButton()}
                    >
                        {t('createaPriceLimit')}
                    </PriceLimitCreationButton>
                )}
                {tripleState === 2 && (
                    <div>
                        <PriceLimitInput
                            id="pricelimitInputBox"
                            type="number"
                            placeholder="Limite de prix"
                            value={currentPriceLimit}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setCurrentPriceLimit(e.target.value)}
                        />
                        <PriceLimitValidationButton
                            isDark={isDark}
                            onClick={() => handleValidateButton()}
                        >
                            {t('validate')}
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
                            {t('delete')}
                        </PriceLimitDeleteButton>
                    </div>
                )}
                <DescriptionText>{t('priceLimitDescription')}</DescriptionText>
                <SourceButtonContainer isDark={isDark} onClick={() => handleSourceButtonClick()}>
                    <LinkIcon isDark={isDark} size={30}/>
                </SourceButtonContainer>
            </ContentContainer>
        </div>
    );
};

export default EletricityPriceTab;
