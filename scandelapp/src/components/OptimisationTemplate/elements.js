import styled from 'styled-components'
import { Black, Grey, Yellow, Green } from '../../colors';

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
  background-color: ${props => props.isDark && props.checked ?  Green + 'FF' : props.isDark && !props.checked ? Grey + 'FF' : !props.isDark && props.checked ? Green + 'FF' : Grey + 'FF'};
  margin: 6px;
  border: 2px solid ${Black};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.isDark ? Yellow : Black};
  }
`;

/** Style for the optimisation type text */
export const TypeText = styled.p`
  position: absolute;
  top: 8px;
  left: 10px;
  font-size: 16px;
  user-select: none;
  color : ${props => props.isDark ? Black : Black};
  font-weight: 500;
  max-width: 195px
`;
/** Style for the optimisation location text */
export const LocationText = styled.p`
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 14px;
  user-select: none;
  color : ${props => props.isDark ? Black : Black};
  font-weight: 500;
`;

/** Style for the optimisation description text */
export const DescriptionText = styled.p`
  position: absolute;
  top: 50px;
  left: 10px;
  font-size: 14px;
  user-select: none;
  color : ${props => props.isDark ? Black : Black};
  font-weight: 500;
  font-style: italic;
`;

/** Container for the solution text **/
export const SolutionTextContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 80px;
    top: 6px;
    right: 10px;
    background-color: rgb(42, 43, 42);
    border-radius: 10px;
`;

/** Style for the optimisation solution text */
export const SolutionText = styled.p`
  position: relative;
  font-size: 16px;
  user-select: none;
  color : ${props => props.isDark ? Yellow : Black};
  font-weight: bold;
`;