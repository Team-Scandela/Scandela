import styled from 'styled-components'
import { Yellow, Black, White } from '../../colors';

/** Container of the decision pannel and the button */
export const DecisionMenuContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    right : 0px;
    transform : translate(50%, -50%);
    width : 1000px;
    height : 625px;
    overflow: visible; /* To allow the button to overflow because of the overflow : hidden rules in App.css */
`;

/** Button who allows to open the decision pannel */
export const DecisionMenuButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;

    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    transition : all 0.5s ease-in-out;

    position: absolute;
    top: 50%;
    right : ${props => props.show ? '102%' : '52%'};
    transform: ${props => props.show ? 'translate(0%, -50%)' : 'translate(0%, -50%)'};

`;


/** Container of the decision pannel  */
export const DecisionPanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 625px;
    border-radius: 20px 0px 0px 20px;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Black : Yellow };
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0);

    position: absolute;
    top: 50%;
    right : ${props => props.show ? '50%' : '0%'};

    transition : all 0.5s ease-in-out;

    transform: translate(0%, -50%);
`;