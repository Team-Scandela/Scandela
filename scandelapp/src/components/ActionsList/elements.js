import styled from "styled-components";
import { Yellow, Black, White } from '../../colors';

/** Container of the decision pannel and the button */
export const ActionsListContainer = styled.div``;

/** Container for the background of the searchbar **/
export const ActionsListButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 40px;
    top: 25px;
    left: 1010px;
    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      font-size: 105%;
    }
`;

/** Container of the decision pannel  */
export const ActionsListPanel = styled.div`
    display: flex;
    width: 800px;
    height: 450px;
    border-radius: 10px 10px 10px 10px;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Yellow : Yellow };
    color : ${props => props.isDark ? Black : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0);

    position: absolute;
    top: ${props => props.show ? '70%' : '150%'};
    right : 25%;

    transition : all 0.5s ease-in-out;

    transform: translate(0%, -50%);
`;