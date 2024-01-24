import React from 'react';

import middle from 'middle.png';
import elec from 'elec.png';
import bio from 'bio.png';
import lumi from 'lumi.png';

import {
    GaugeContainerPersonnalized,
    GaugeBackground,
    GaugeLogo,
    GaugeLevelMiddle,
    GaugeOldLevel,
} from './elements';
import { Green, Red } from '../../colors';

interface PersonnalizedGaugeProps {
    id: string;
    isDark: boolean;
    isElec: boolean;
    isBio: boolean;
    isLumi: boolean;
    level: number;
    oldLevel: number;
    top: number;
    left: number;
}

//* Personnalized gauge component */
const PersonnalizedGauge: React.FC<PersonnalizedGaugeProps> = ({
    id,
    isDark,
    isElec,
    isBio,
    isLumi,
    level,
    oldLevel,
    top,
    left,
}) => {
    const logo = isElec
        ? isDark
            ? elec
            : elec
        : isBio
        ? isDark
            ? bio
            : bio
        : isLumi
        ? isDark
            ? lumi
            : lumi
        : isDark
        ? elec
        : elec;
    const diffLevel = oldLevel - level;

    return (
        <div id={id}>
            <GaugeContainerPersonnalized top={top} left={left}>
                <GaugeBackground
                    src={isDark ? middle : middle}
                />
                <GaugeLevelMiddle level={level} />
                <GaugeOldLevel
                    color={diffLevel > 0 ? Red : Green}
                    level={level}
                    diffLevel={diffLevel}
                />
                <GaugeLogo draggable="false" src={logo} />
            </GaugeContainerPersonnalized>
        </div>
    );
};

export default PersonnalizedGauge;