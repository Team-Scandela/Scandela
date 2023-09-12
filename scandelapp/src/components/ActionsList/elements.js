import styled from "styled-components";
import { Yellow, Black, White, Grey } from '../../colors';

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
    left: 1040px;
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

export const ScrollableOptimisationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: 1%;
  top: 2%;
  width: 400px;
  height: 430px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: ${props => props.isDark ? Black + 'FF' : Yellow + 'FF'};
`;

/** Container of the optimisation template */
export const OptimisationTemplateContainer = styled.div`
  display: flex;
  position: absolute;
  width: 370px;
  height: 95px;
  left: 0px;
  top: ${props => props.y}px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${props => props.isDark  ? Grey + 'FF' : Grey + 'FF'};
  margin: 6px;
  border: 2px solid ${Black};
`;

export const TypeText = styled.p`
  position: relative;
  top: 8px;
  left: 10px;
  font-size: 18px;
  user-select: none;
  color : ${props => props.isDark ? Black : Black};
  font-weight: 500;
`;
