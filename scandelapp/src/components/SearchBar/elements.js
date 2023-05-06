import styled from "styled-components";
import { Yellow, Black, White } from '../../colors';
import { MdSearch } from 'react-icons/md';

/** Container for the background of the searchbar **/
export const SearchBarContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    width: 450px;
    height: 40px;
    top: 25px;
    left: 30px;
    background-color: ${props => props.isDark ? Black + 'CC' : White + 'CC'};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
`;

/** Container that cointain the scandela logo **/
export const LogoContainer = styled.img`
    height: 100%;
    padding : 5px;
    user-select: none;
`;

/**  Container that contain the input in order to write on the searchbar**/
export const InputWrapper =  styled.input`
    position: absolute;
    width : 70%;
    height: 75%;
    left: 50px;
    top: 15%;
    border: none;
    font-size: 13px;

    color : ${props => props.isDark ? Yellow : Black};
    background-color: transparent;

    &:focus {
        outline: none;
    }
`;

/** Search icon **/
export const SearchIcon = styled(MdSearch)`
    position: absolute;
    right : 10px;
    font-size : 28px;

    color : ${props => props.isDark ? Yellow : Black};

    &:hover {
        cursor: pointer;
    }
`;