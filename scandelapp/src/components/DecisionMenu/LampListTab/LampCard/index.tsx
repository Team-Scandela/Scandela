import { useState } from 'react';

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

import { Lamp } from '../../../../services/lampsService';

interface LampCardProps {
    isDark: boolean,
    lampItem: Lamp,
    setOpenPupLamp: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenPupBulb: React.Dispatch<React.SetStateAction<boolean>>;
};

const Lampcard: React.FC<LampCardProps> = ({isDark, lampItem, setOpenPupLamp, setOpenPupBulb}) => {

    console.log('LampItem = ', lampItem);
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
                    <LampCardPupBulb onClick={() => setOpenPupBulb(true)} />
                    <LampCardBulbTrash />
                    <LampCardIconLamp />
                    <LampCardHeight>{lampItem.height ? lampItem.height : 'unknow'}</LampCardHeight>
                </LampCardContent>
            </LampCardContainer>
    );
};

export default Lampcard;