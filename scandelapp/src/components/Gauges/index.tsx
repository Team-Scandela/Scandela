import * as React from 'react'
import { GaugeContainerLeft, GaugeContainerMiddle, GaugeContainerRight, GaugeBackground, GaugeLogo, GaugeLevelLeft, GaugeLevelMiddle, GaugeLevelRight } from './elements'
import * as images from './gaugesImports'

interface GaugesProps {
    id : string,
    isDark: boolean;
}

//* Gauges component */
const Gauges: React.FC<GaugesProps> = ({ id, isDark }) => {

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

export default Gauges
