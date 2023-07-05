import * as React from 'react'
import { GaugeContainerLeft, GaugeContainerMiddle, GaugeContainerRight, GaugeBackground, GaugeLogo, GaugeLevelLeft, GaugeLevelMiddle, GaugeLevelRight } from './elements'
import left from '../../assets/gauges/left.png'
import middle from '../../assets/gauges/middle.png'
import right from '../../assets/gauges/right.png'
import elec from '../../assets/gauges/elec.png'
import bio from '../../assets/gauges/bio.png'
import lumi from '../../assets/gauges/lumi.png'

interface GaugesProps {
    isDark: boolean;
}

//* Gauges component */
const Gauges: React.FC<GaugesProps> = ({ isDark }) => {

    const [levelElec, setLevelElec] = React.useState<number>(50);
    const [levelBio, setLevelBio] = React.useState<number>(25);
    const [levelLumi, setLevelLumi] = React.useState<number>(75);

    return (
        <div>
            <GaugeContainerLeft>
                <GaugeBackground src={left} />
                <GaugeLevelLeft level={levelElec} />
                <GaugeLogo src={elec} />
            </GaugeContainerLeft>

            <GaugeContainerMiddle>
                <GaugeBackground src={middle} />
                <GaugeLevelMiddle level={levelBio} />
                <GaugeLogo src={bio} />
            </GaugeContainerMiddle>

            <GaugeContainerRight>
                <GaugeBackground src={right} />
                <GaugeLevelRight level={levelLumi} />
                <GaugeLogo src={lumi} />
            </GaugeContainerRight>
        </div>
    )
}

export default Gauges
