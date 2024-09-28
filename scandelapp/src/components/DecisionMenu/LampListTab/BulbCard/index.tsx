import { useState, useEffect } from 'react';

import { BulbCardClose, BulbCardConsommation, BulbCardContainer, BulbCardContent, BulbCardIntensity, BulbCardName, BulbCardTitle } from './elements';

import { Lamp } from '../../../../services/lampsService';
import { fetchBulbById, Bulb } from '../../../../services/bulbService';

interface BulbCardProps {
    isDark: boolean,
    lampItem: Lamp,
    setOpenPupBulb: React.Dispatch<React.SetStateAction<boolean>>;
};

const BulbCard: React.FC<BulbCardProps> = ({isDark, lampItem, setOpenPupBulb}) => {
    const [bulb, setBulb] = useState<Bulb | undefined>(undefined);
    const [isModifBulb, setIsModifBulb] = useState(false);
    
    const [loading, setLoading] = useState<boolean>(true);

    const getBulbById = async (id: string) => {
        
            try {
                setLoading(true);
                const bulbData = await fetchBulbById(lampItem.uuidbulb);
                setBulb(bulbData);
                console.log("BULDATA, BULB = ", bulbData, bulb);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'ampoule:", error);
            } finally {
                setLoading(false);
            }
    };

    useEffect(() => {
        if (lampItem?.uuidbulb)
            getBulbById(lampItem.uuidbulb);

    }, [lampItem.uuidbulb]);

    return (
        <BulbCardContainer>
            <BulbCardContent>
                <BulbCardClose onClick={() => setOpenPupBulb(false)} />
                <BulbCardTitle>{"Ampoule"}</BulbCardTitle>
                <BulbCardName>{bulb ? bulb.reference : "Aucune donnée disponible"}</BulbCardName>
                <BulbCardConsommation>{bulb ? `${bulb.consommation} W` : "N/A"}</BulbCardConsommation>
                <BulbCardIntensity>{bulb ? `${bulb.intensity} lm` : "N/A"}</BulbCardIntensity>
            </BulbCardContent>
        </BulbCardContainer>
    );
};

export default BulbCard;