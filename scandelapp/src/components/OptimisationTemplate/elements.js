import styled from 'styled-components'
import { Black, Grey, Yellow } from '../../colors';

/** Container of the optimisation template */
export const OptimisationTemplateContainer = styled.div`
  display: flex;
  position: absolute;
  width: 370px;
  height: 85px;
  left: 0px;
  top: ${props => props.y}px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${props => props.isDark ? Grey + 'FF': Grey + 'FF'};
  margin: 6px;
  border: 2px solid ${Black};

`;

export const Checkbox = styled.input`
    display: flex;
    position: absolute;
    transform: scale(1.5);
    left: 10px;
    top: 10px;
    background-color: ${Yellow};
`;
