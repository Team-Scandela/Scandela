import styled from 'styled-components';
import { Yellow } from '../../colors';

interface topLeftProps {
    top: number;
    left: number;
}

interface levelProps {
    level: number;
}

interface levelDiffLevelProps {
    level: number;
    diffLevel: number;
    color: string;
}

export const GaugeContainer = styled.div`
    display: flex;
    position: fixed;
    height: 100px;
    width: ${450 / 6.5}px;
`;

export const GaugeContainerPersonnalized = styled(GaugeContainer)<topLeftProps>`
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
`;

export const GaugeBackground = styled.img`
    display: flex;
    user-select: none;
    position: fixed;
    height: 100px;
`;

export const GaugeLevel = styled.div<levelProps>`
    background-color: ${Yellow};

    position: absolute;
    bottom: 4px;

    height: calc((100% - 8px) * ${(props) => props.level / 100});
    left: 4px;
    width: calc(100% - 8px);
`;

export const GaugeLevelMiddle = styled(GaugeLevel)`
    border-radius: 0px;
`;

export const GaugeOldLevel = styled.div<levelDiffLevelProps>`
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
