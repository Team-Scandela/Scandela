import styled from "styled-components";
import { Yellow, Black, White } from '../../colors';
import { TbLogout } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLanguage } from 'react-icons/md'

/** Container for the background of the searchbar **/
export const SettingsButtonContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    width: 120px;
    height: 40px;
    top: 25px;
    right: 30px;
    opacity: 0.8;
    background-color: ${props => props.isDark ? Black + 'FF' : White + 'FF'};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 10px;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
`;

export const NameOfCity = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  user-select: none;
  color: ${props => props.isDark ? Yellow : Black};
  font-weight: 450;
  letter-spacing: 1px;
`;

/** Container of option menu map */
export const OptionsMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: ${props => props.show ? '200px' : '0px'};
    height: ${props => props.show ? '40px' : '0px'};
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    color : ${props => props.isDark ? Yellow : Black};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    top: 25px;
    right: 170px;
`;

export const LogoutButton = styled(TbLogout)`
  cursor: pointer;
  position: relative;

  &:hover {
    top: -1px;
  }
`;

export const ProfileButton = styled(CgProfile)`
  cursor: pointer;
  position: relative;

  &:hover {
    top: -1px;
  }
`;

export const LanguageButton = styled(MdOutlineLanguage)`
  cursor: pointer;
  position: relative;

  &:hover {
    top: -1px;
  }
`;