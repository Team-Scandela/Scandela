import styled from "styled-components";
import { Yellow } from "../../colors";

export const GaugeContainer = styled.div`
    display: flex;
    position: fixed;
    height: 100px;
    width: ${450 / 6.5}px;
    bottom: 30px;
`;

export const GaugeContainerLeft = styled(GaugeContainer)`
    right: 175px;
`;

export const GaugeContainerMiddle = styled(GaugeContainer)`
    right: 100px;
`;

export const GaugeContainerRight = styled(GaugeContainer)`
    right: 25px;
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

export const GaugeLogo = styled.img`
    display: flex;
    user-select: none;
    position: fixed;
    height: 100px;
`;
