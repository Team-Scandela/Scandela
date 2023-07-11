import styled from "styled-components";
import { Yellow, Black, White } from '../../colors';

/** Container for the background of the searchbar **/
export const SettingsButtonContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    width: 120px;
    height: 40px;
    top: 25px;
    right: 30px;
    background-color: ${props => props.isDark ? Black + 'FF' : White + 'FF'};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
`;

export const NameOfCity = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  user-select: none;
  color: ${props => props.isDark ? Yellow : Yellow};
  font-weight: 450;
  letter-spacing: 1px;
`;