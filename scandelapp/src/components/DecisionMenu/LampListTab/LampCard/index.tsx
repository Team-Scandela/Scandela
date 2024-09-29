import { useState } from 'react';

import { Lamp, suppLamp } from '../../../../services/lampsService';

import { useAtom } from 'jotai';
import { lampsAtom, isLoadingAtom } from '../../../../atoms/lampsAtom';

import {
    LampCardContainer,
    LampCardContent,
    LampCardClose,
    LampCardTitle,
    LampCardAdressIcon,
    LampCardAdress,
    LampCardGeoLoc,
    LampCardBulbTrash,
    LampCardBulb,
    LampCardHeight,
    LampCardIconBulb,
    LampCardIconLamp,
    LampCardPupBulb

} from './elements';

interface LampCardProps {
    isDark: boolean,
    lampItem: Lamp,
    setOpenPupLamp: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenPupBulb: React.Dispatch<React.SetStateAction<boolean>>;
};

const Lampcard: React.FC<LampCardProps> = ({isDark, lampItem, setOpenPupLamp, setOpenPupBulb}) => {

    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    const handleSuppLamp = async() => {
        await suppLamp(
            lampItem.id,
            lamps,
            setLamps,
            setIsLoading,
            setOpenPupLamp
        );
    }

    return (
            <LampCardContainer>
                <LampCardContent>
                    <LampCardClose onClick={() => setOpenPupLamp(false)} />
                    <LampCardTitle>{lampItem.name ? lampItem.name : 'unknow'}</LampCardTitle>
                    <LampCardAdressIcon />
                    <LampCardAdress>{lampItem.address ? lampItem.address : 'unknow'}</LampCardAdress>
                    <LampCardGeoLoc>{lampItem.latitude}, {lampItem.longitude}</LampCardGeoLoc>
                    <LampCardIconBulb />
                    <LampCardBulb>{lampItem.lampType ? lampItem.lampType : 'unknow'}</LampCardBulb>
                    <LampCardPupBulb onClick={() => setOpenPupBulb(true)} isBulb={lampItem.uuidbulb ? true : false}/>
                    <LampCardBulbTrash onClick={handleSuppLamp}/>
                    <LampCardIconLamp />
                    <LampCardHeight>{lampItem.height ? lampItem.height : 'unknow'}</LampCardHeight>
                </LampCardContent>
            </LampCardContainer>
    );
};

export default Lampcard;