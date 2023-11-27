import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const GaugeContainer = styled.div`
    display: flex;
    position: fixed;
    height: 100px;
    width: ${450 / 6.5}px;
`;

export const GaugeContainerLeft = styled(GaugeContainer)`
    bottom: ${(props) => (props.decisionPanelExtended ? 55 : 30)}px;
    right: ${(props) =>
        props.decisionPanelExtended ? 325 : props.decal ? 385 : 175}px;
    transition: all 0.5s ease-in-out;
`;

export const GaugeContainerMiddle = styled(GaugeContainer)`
    bottom: ${(props) => (props.decisionPanelExtended ? 55 : 30)}px;
    right: ${(props) =>
        props.decisionPanelExtended ? 220 : props.decal ? 310 : 100}px;
    transition: all 0.5s ease-in-out;
`;

export const GaugeContainerRight = styled(GaugeContainer)`
    bottom: ${(props) => (props.decisionPanelExtended ? 55 : 30)}px;
    right: ${(props) => (props.decisionPanelExtended ? 115 : 25)}px;
    transition: all 0.5s ease-in-out;
`;

export const GaugeContainerPersonnalized = styled(GaugeContainer)`
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
`;

export const GaugeBackground = styled.img`
    display: flex;
    user-select: none;
    position: fixed;
    height: 100px;
`;

export const GaugeLevel = styled.div`
    background-color: ${Yellow};

    position: absolute;
    bottom: 4px;

    height: calc((100% - 8px) * ${(props) => props.level / 100});
    left: 4px;
    width: calc(100% - 8px);
`;

export const GaugeLevelLeft = styled(GaugeLevel)`
    border-bottom-left-radius: 5px;
`;

export const GaugeLevelMiddle = styled(GaugeLevel)`
    border-radius: 0px;
`;

export const GaugeLevelRight = styled(GaugeLevel)`
    border-bottom-right-radius: 5px;
`;

export const GaugeOldLevel = styled.div`
    background-color: ${(props) => props.color};

    position: absolute;

    bottom: ${(props) =>
        props.diffLevel >= 0
            ? `calc((100% - 8px) * ${props.level / 100})`
            : `calc((100% - 8px) * ${
                  props.level / 100 - -props.diffLevel / 100
              } + 4px)`};

    height: calc(
        (100% - 8px) *
            ${(props) =>
                props.diffLevel >= 0
                    ? props.diffLevel / 100
                    : -props.diffLevel / 100}
    );

    left: 4px;
    width: calc(100% - 9px);
`;

export const GaugeLogo = styled.img`
    display: flex;
    user-select: none;
    position: fixed;
    height: 100px;
`;

export const GaugePup = styled.div`
    display: ${(props) => (props.show ? 'flex' : 'none')};
    user-select: none;
    position: fixed;
    height: 100px;
    width: 200px;
    bottom: 30px;
    transition: all 0.5s ease-in-out;

    background-color: ${(props) => (props.isDark ? Black : White)};
    border-radius: 10%;
    border-color: ${Yellow};
    border-style: solid;
    border-width: 2px;
`;

export const GaugePupLeft = styled(GaugePup)`
    right: 250px;
`;

export const GaugePupMiddle = styled(GaugePup)`
    right: 175px;
`;

export const GaugePupRight = styled(GaugePup)`
    right: 100px;
`;

export const GaugePupText = styled.div`
    color: ${Yellow};
    font-size: 15px;

    position: absolute;
    top: 10%;
    left: 10%;

    width: 80%;
    height: 80%;

    text-align: center;
    vertical-align: middle;
`;
