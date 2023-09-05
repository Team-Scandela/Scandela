import * as React from 'react'
import { GaugeContainerLeft, GaugeContainerMiddle, GaugeContainerRight, GaugeBackground, GaugeLogo, GaugeLevelLeft, GaugeLevelMiddle, GaugeLevelRight, GaugeContainerPersonnalized } from './elements'
import * as images from './gaugesImports'

interface GaugesProps {
    id : string,
    isDark: boolean;
}

//* Gauges component */
export const Gauges: React.FC<GaugesProps> = ({ id, isDark }) => {

    const [levelElec, setLevelElec] = React.useState<number>(50);
    const [levelBio, setLevelBio] = React.useState<number>(25);
    const [levelLumi, setLevelLumi] = React.useState<number>(75);

    return (
        <div id={id}>
            <GaugeContainerLeft>
                <GaugeBackground src={isDark ? images.left : images.leftLight} />
                <GaugeLevelLeft level={levelElec} />
                <GaugeLogo src={isDark ? images.elec : images.elecLight} />
            </GaugeContainerLeft>

            <GaugeContainerMiddle>
                <GaugeBackground src={isDark ? images.middle : images.middleLight} />
                <GaugeLevelMiddle level={levelBio} />
                <GaugeLogo src={isDark ? images.bio : images.bioLight} />
            </GaugeContainerMiddle>

            <GaugeContainerRight>
                <GaugeBackground src={isDark ? images.right : images.rightLight} />
                <GaugeLevelRight level={levelLumi} />
                <GaugeLogo src={isDark ? images.lumi : images.lumiLight} />
            </GaugeContainerRight>
        </div>
    )
}

interface PersonnalizedGaugeProps {
    id : string,
    isDark: boolean;
    isElec : boolean;
    isBio : boolean;
    isLumi : boolean;
    level : number;
    top : number;
    left : number;
}

export const PersonnalizedGauge: React.FC<PersonnalizedGaugeProps> = ({ id, isDark, isElec, isBio, isLumi, level, top, left }) => {

    const logo = isElec ? images.elec : isBio ? images.bio : isLumi ? images.lumi : images.elec;

    return (
        <div id={id}>
            <GaugeContainerPersonnalized top={top} left={left}>
                <GaugeBackground src={isDark ? images.middle : images.middleLight} />
                <GaugeLevelMiddle level={level} />
                <GaugeLogo src={logo} />
            </GaugeContainerPersonnalized>
        </div>
    )
}