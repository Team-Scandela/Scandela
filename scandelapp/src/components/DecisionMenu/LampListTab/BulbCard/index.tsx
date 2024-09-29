import { useState, useEffect } from 'react';

import {
    BulbCardClose,
    BulbCardConsommation,
    BulbCardContainer,
    BulbCardContent,
    BulbCardIntensity,
    BulbCardName,
    BulbCardTitle,
    BulbCardBulbIcon,
    BulbCardConsoIcon,
    BulbCardIntensityIcon,
    BulbCardModification,
    BulbCardInputName,
    BulbCardSendIcon,
    BulbCardValidateIcon,
} from './elements';

import { Lamp, updateLamp } from '../../../../services/lampsService';
import {
    fetchBulbById,
    fetchBulbByName,
    Bulb,
} from '../../../../services/bulbService';

import { useAtom } from 'jotai';
import { lampsAtom, isLoadingAtom } from '../../../../atoms/lampsAtom'; // Remplacez par le bon chemin

interface BulbCardProps {
    isDark: boolean;
    lampItem: Lamp;
    setOpenPupBulb: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulbCard: React.FC<BulbCardProps> = ({
    isDark,
    lampItem,
    setOpenPupBulb,
}) => {
    const [bulb, setBulb] = useState<Bulb | undefined>(undefined);
    const [isModifBulb, setIsModifBulb] = useState(false);

    const [newBulb, setNewBulb] = useState<Bulb | undefined>(undefined);
    const [isNewBulb, setIsNewBulb] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    const [inputNameBulb, setInputNameBulb] = useState('');

    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    const getBulbById = async (id: string) => {
        try {
            setLoading(true);
            const bulbData = await fetchBulbById(lampItem.uuidbulb);

            setBulb(bulbData);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'ampoule:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const getBulbByName = async (name: string) => {
        try {
            setLoading(true);
            const bulbData = await fetchBulbByName(name);

            setNewBulb(bulbData);
            setIsNewBulb(true);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'ampoule:",
                error
            );
            setIsNewBulb(false);
        } finally {
            setLoading(false);
            if (newBulb === undefined) setIsNewBulb(false);
        }
    };

    const modifLampBulb = async () => {
        try {
            setLoading(true);
            let newLamp = lampItem;
            newLamp.uuidbulb = newBulb.id;
            await updateLamp(
                lampItem.id,
                newLamp,
                lamps,
                setLamps,
                setIsLoading
            );
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'ampoule:",
                error
            );
        } finally {
            setLoading(false);
            setIsModifBulb(false);
        }
    };

    const handleModifiyInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputNameBulb(e.target.value);
    };

    const handleGetBulb = () => {
        if (inputNameBulb) getBulbByName(inputNameBulb);
    };

    const handleApplyModification = () => {
        if (isNewBulb) {
            modifLampBulb();
        }
    };

    useEffect(() => {
        if (lampItem?.uuidbulb) getBulbById(lampItem.uuidbulb);
    }, [lampItem.uuidbulb]);

    return (
        <BulbCardContainer>
            <BulbCardContent>
                <BulbCardClose onClick={() => setOpenPupBulb(false)} />
                <BulbCardTitle>{'Ampoule'}</BulbCardTitle>
                <BulbCardBulbIcon />
                <BulbCardConsoIcon />
                <BulbCardIntensityIcon />
                {isModifBulb && (
                    <>
                        <BulbCardValidateIcon
                            onClick={() => handleApplyModification()}
                        />
                        <BulbCardSendIcon onClick={() => handleGetBulb()} />
                        <BulbCardInputName
                            placeholder="Bulb name"
                            value={inputNameBulb}
                            onChange={handleModifiyInputName}
                        />
                        {isNewBulb && (
                            <>
                                <BulbCardConsommation>
                                    {newBulb
                                        ? `${newBulb.consommation} W`
                                        : 'N/A'}
                                </BulbCardConsommation>
                                <BulbCardIntensity>
                                    {newBulb
                                        ? `${newBulb.intensity} lm`
                                        : 'N/A'}
                                </BulbCardIntensity>
                            </>
                        )}
                    </>
                )}
                {!isModifBulb && (
                    <>
                        <BulbCardModification
                            onClick={() => setIsModifBulb(true)}
                        />
                        <BulbCardName>
                            {bulb ? bulb.reference : 'Aucune donnée disponible'}
                        </BulbCardName>
                        <BulbCardConsommation>
                            {bulb ? `${bulb.consommation} W` : 'N/A'}
                        </BulbCardConsommation>
                        <BulbCardIntensity>
                            {bulb ? `${bulb.intensity} lm` : 'N/A'}
                        </BulbCardIntensity>
                    </>
                )}
            </BulbCardContent>
        </BulbCardContainer>
    );
};

export default BulbCard;
