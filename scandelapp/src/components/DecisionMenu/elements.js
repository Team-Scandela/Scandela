import styled from 'styled-components'
import { Yellow, Black, White } from '../../colors';

/** Button who allows to open the decision pannel */
export const DecisionMenuButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    bottom: 350px;
    right: ${props => props.isOn ? '520px' : '10px' };
`;

/** Container of the decision pannel  */
export const DecisionPannelContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 625px;
    border-radius: 20px 0px 0px 20px;
    transition: right 0.8s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Black : Yellow };
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0);

    position: fixed;
    top: 100px;
    right: 0px;
`;