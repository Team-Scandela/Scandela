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

export const TypeText = styled.p`
  position: relative;
  top: 8px;
  left: 10px;
  font-size: 18px;
  user-select: none;
  color : ${props => props.isDark ? Black : Black};
  font-weight: 500;
`;

