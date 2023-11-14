import * as React from 'react';
import {
    GaugeContainerLeft,
    GaugeContainerMiddle,
    GaugeContainerRight,
    GaugeBackground,
    GaugeLogo,
    GaugeLevelLeft,
    GaugeLevelMiddle,
    GaugeLevelRight,
    GaugeContainerPersonnalized,
    GaugeOldLevel,
    GaugePupLeft,
    GaugePupMiddle,
    GaugePupRight,
    GaugePupText
} from './elements';
import * as images from './gaugesImports';
import { Green, Red } from '../../colors';

/** Props of the gauges
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {boolean} actionsListExtended -  Boolean to check if the actions list is extended or not
 *
 */
interface GaugesProps {
    id: string;
    isDark: boolean;
    decisionPanelExtended: boolean;
    actionsListExtended: boolean;
}

//* Gauges component */
export const Gauges: React.FC<GaugesProps> = ({
    id,
    isDark,
    decisionPanelExtended,
    actionsListExtended,
}) => {
    const [levelElec, setLevelElec] = React.useState<number>(50);
    const [levelBio, setLevelBio] = React.useState<number>(25);
    const [levelLumi, setLevelLumi] = React.useState<number>(75);

    const [oldLevelElec, setOldLevelElec] = React.useState<number>(25);
    const [oldLevelBio, setOldLevelBio] = React.useState<number>(50);
    const [oldLevelLumi, setOldLevelLumi] = React.useState<number>(75);

    const [diffLevelElec, setDiffLevelElec] = React.useState<number>(
        oldLevelElec - levelElec
    );
    const [diffLevelBio, setDiffLevelBio] = React.useState<number>(
        oldLevelBio - levelBio
    );
    const [diffLevelLumi, setDiffLevelLumi] = React.useState<number>(
        oldLevelLumi - levelLumi
    );

    const [showPupLeft, setShowPupLeft] = React.useState<boolean>(false);
    const [showPupMiddle, setShowPupMiddle] = React.useState<boolean>(false);
    const [showPupRight, setShowPupRight] = React.useState<boolean>(false);

    return (
        <div id={id}>
            {!actionsListExtended && (
                <div>
                    <GaugeContainerLeft
                        decisionPanelExtended={decisionPanelExtended}
                        decal={showPupMiddle || showPupRight}
                        onClick={() => {
                            setShowPupLeft(!showPupLeft);
                            setShowPupMiddle(false);
                            setShowPupRight(false);
                        }}
                    >
                        <GaugeBackground
                            src={isDark ? images.left : images.leftLight}
                        />
                        <GaugeLevelLeft level={levelElec} />
                        <GaugeOldLevel
                            color={diffLevelElec > 0 ? Red : Green}
                            level={levelElec}
                            diffLevel={diffLevelElec}
                        />
                        <GaugeLogo
                            src={isDark ? images.elec : images.elecLight}
                        />

                        <GaugePupLeft
                            show={showPupLeft}
                            isDark={isDark}
                        >
                            <GaugePupText>Consommation énergétique<br /><b>30 GW/h</b><br />40% de l\'objectif</GaugePupText>
                        </GaugePupLeft>
                    </GaugeContainerLeft>

                    <GaugeContainerMiddle
                        decisionPanelExtended={decisionPanelExtended}
                        decal={showPupRight}
                        onClick={() => {
                            setShowPupLeft(false);
                            setShowPupMiddle(!showPupMiddle);
                            setShowPupRight(false);
                        }}
                    >
                        <GaugeBackground
                            src={isDark ? images.middle : images.middleLight}
                        />
                        <GaugeLevelMiddle level={levelBio} />
                        <GaugeOldLevel
                            color={diffLevelBio > 0 ? Red : Green}
                            level={levelBio}
                            diffLevel={diffLevelBio}
                        />
                        <GaugeLogo
                            src={isDark ? images.bio : images.bioLight}
                        />
                        <GaugePupMiddle
                            show={showPupMiddle}
                            isDark={isDark}
                        >
                            <GaugePupText>Impact sur l\'environnement<br /><b>350g de CO2/heure</b><br />80% de l\'objectif</GaugePupText>
                        </GaugePupMiddle>
                    </GaugeContainerMiddle>

                    <GaugeContainerRight
                        decisionPanelExtended={decisionPanelExtended}
                        decal={false}
                        onClick={() => {
                            setShowPupLeft(false);
                            setShowPupMiddle(false);
                            setShowPupRight(!showPupRight);
                        }}
                    >
                        <GaugeBackground
                            src={isDark ? images.right : images.rightLight}
                        />
                        <GaugeLevelRight level={levelLumi} />
                        <GaugeOldLevel
                            color={diffLevelLumi > 0 ? Red : Green}
                            level={levelLumi}
                            diffLevel={diffLevelLumi}
                        />
                        <GaugeLogo
                            src={isDark ? images.lumi : images.lumiLight}
                        />

                        <GaugePupRight
                            show={showPupRight}
                            isDark={isDark}
                        >
                            <GaugePupText>Qualité de l'éclairage<br />20% des zones disposent d'un bon éclairage</GaugePupText>
                        </GaugePupRight>
                    </GaugeContainerRight>
                </div>
            )}
        </div>
    );
};








/** Ligth / Dark mode button
 * @param {number} id - Id of the gauge
 * @param {boolean} isDark - If the mode is dark or not
 * @param {boolean} isElec - If the gauge is for electricity
 * @param {boolean} isBio - If the gauge is for bio
 * @param {boolean} isLumi - If the gauge is for luminosity
 * @param {number} level - Level of the gauge
 * @param {number} oldLevel - Old level of the gauge
 * @param {number} top - Top position of the gauge
 * @param {number} left - Left position of the gauge
 */
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
export const PersonnalizedGauge: React.FC<PersonnalizedGaugeProps> = ({
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
            ? images.elec
            : images.elecLight
        : isBio
        ? isDark
            ? images.bio
            : images.bioLight
        : isLumi
        ? isDark
            ? images.lumi
            : images.lumiLight
        : isDark
        ? images.elec
        : images.elecLight;
    const diffLevel = oldLevel - level;

    return (
        <div id={id}>
            <GaugeContainerPersonnalized top={top} left={left}>
                <GaugeBackground
                    src={isDark ? images.middle : images.middleLight}
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
