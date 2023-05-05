import styled from "styled-components";
import { YellowScandela } from '../../colors';


/** Container for the background of the searchbar **/
export const SearchBarBg = styled.div`
    position: absolute;
    background-color: rgba(42, 43, 42, 0.8);
    width: 450px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    height: 40px;
    border-radius: 15px;
    top: 25px;
    left: 25px;
`;

/** Container that cointain the scandela logo **/
export const LogoContainer = styled.div`
  width: 10%;
  height: 100%;
  padding-top: 2.5px;
  padding-bottom: 2.5px;
  padding-left: 5px;
  user-select: none; 

  img {
    width: 95%;
    height: 95%;
    object-fit: contain;
  }
`;

/** container that contain the search icon **/
export const SearchIconContainer = styled.div`
  width: 10%;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  padding-right: 5px;

  :hover {
    cursor: pointer;
  }
`;

/**  Container that contain the input in order to write on the searchbar**/
export const InputWrapper =  styled.div`
  width: 80%;
  height: 70%;
  position: absolute;
  left: 10%;
  top: 15%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 0 10px;
    ::placeholder {
      color: ${YellowScandela};
    }
  }
`;