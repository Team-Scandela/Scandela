import * as React from 'react';
import { useEffect } from 'react';
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
    GaugePupText,
} from './elements';
import * as images from './gaugesImports';
import { Green, Red } from '../../colors';
import { useTranslation } from 'react-i18next';
import { Tabs } from "../../pages/main";

/** Props of the gauges
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {any} currentTab - Store the current tab displayed in the decision panel
 *
 */
interface GaugesProps {
    id: string;
    isDark: boolean;
    decisionPanelExtended: boolean;
    currentTab: Tabs;
}

//* Gauges component */
export const Gauges: React.FC<GaugesProps> = ({
    id,
    isDark,
    decisionPanelExtended,
    currentTab,
}) => {
    const [levelElec, setLevelElec] = React.useState<number>(0);
    const [levelBio, setLevelBio] = React.useState<number>(0);
    const [levelLumi, setLevelLumi] = React.useState<number>(0);

    const [oldLevelElec, setOldLevelElec] = React.useState<number>(0);
    const [oldLevelBio, setOldLevelBio] = React.useState<number>(0);
    const [oldLevelLumi, setOldLevelLumi] = React.useState<number>(0);

    const [diffLevelElec, setDiffLevelElec] = React.useState<number>(
        oldLevelElec - levelElec
    );
    const [diffLevelBio, setDiffLevelBio] = React.useState<number>(
        oldLevelBio - levelBio
    );
    const [diffLevelLumi, setDiffLevelLumi] = React.useState<number>(
        oldLevelLumi - levelLumi
    );
    const { t } = useTranslation();

    const [showPupLeft, setShowPupLeft] = React.useState<boolean>(false);
    const [showPupMiddle, setShowPupMiddle] = React.useState<boolean>(false);
    const [showPupRight, setShowPupRight] = React.useState<boolean>(false);

    function parseFloatSafe(input: string): number {
        const trimmedInput = input.trim();

        const isValidNumber = /^[0-9]*\.?[0-9]+$/.test(trimmedInput);
        if (!isValidNumber) {
            return NaN;
        }

        return parseFloat(trimmedInput);
    }

    useEffect(() => {
        const checkScore = () => {
            const vegetalScore = localStorage.getItem('vegetalScore');
            const lightScore = localStorage.getItem('lightScore');
            const consumptionScore = localStorage.getItem('consumptionScore');

            let allScoresDefined = true;

            if (vegetalScore) {
                const parsedScore = parseFloatSafe(vegetalScore);
                if (!isNaN(parsedScore)) {
                    setLevelBio(parsedScore);
                } else {
                    allScoresDefined = false;
                }
            } else {
                allScoresDefined = false;
            }

            if (lightScore) {
                const parsedScore = parseFloatSafe(lightScore);
                if (!isNaN(parsedScore)) {
                    setLevelLumi(parsedScore);
                } else {
                    allScoresDefined = false;
                }
            } else {
                allScoresDefined = false;
            }

            if (consumptionScore) {
                const parsedScore = parseFloatSafe(consumptionScore);
                if (!isNaN(parsedScore)) {
                    setLevelElec(parsedScore);
                } else {
                    allScoresDefined = false;
                }
            } else {
                allScoresDefined = false;
            }

            return allScoresDefined;
        };

        const intervalId = setInterval(() => {
            if (checkScore()) {
                clearInterval(intervalId);
            }
        }, 1000); // Vérifiez les scores toutes les secondes

        return () => clearInterval(intervalId);
    }, []);

    const canBeDisplayed = () => {
        if (decisionPanelExtended && currentTab != Tabs.Scandela)
            return false;
        return true;
    }

    return (
        <div id={id}>
            {canBeDisplayed() && (
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

                        <GaugePupLeft show={showPupLeft} isDark={isDark}>
                            <GaugePupText>
                                {t('energyConsumption')}
                                <br />
                                {t('hasaScore')}
                                <br />
                                {t('of')} <b>{levelElec}%</b>
                            </GaugePupText>
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
                        <GaugePupMiddle show={showPupMiddle} isDark={isDark}>
                            <GaugePupText>
                                {t('environmentalImpact')}
                                <br />
                                {t('hasaScore')}
                                <br />
                                {t('of')} <b>{levelBio}%</b>
                            </GaugePupText>
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

                        <GaugePupRight show={showPupRight} isDark={isDark}>
                            <GaugePupText>
                                {t('lightingQuality')}
                                <br />
                                <b>{levelElec}%</b>{' '}
                                {t('OfTheAreasHaveGoodLighting')}
                            </GaugePupText>
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
