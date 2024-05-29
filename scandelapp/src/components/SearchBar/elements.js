import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';
import { MdSearch } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';
import { GiStreetLight } from 'react-icons/gi';

/** Container for the background of the searchbar **/
export const SearchBarContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    width: 450px;
    height: 40px;
    top: 25px;
    left: 30px;
    background-color: ${(props) =>
        props.isdark ? Black + 'CC' : White + 'CC'};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
`;

/** Container that cointain the scandela logo **/
export const LogoContainer = styled.img`
    height: 100%;
    padding: 5px;
    user-select: none;
`;

/**  Container that contain the input in order to write on the searchbar**/
export const InputWrapper = styled.input`
    position: absolute;
    width: 70%;
    height: 75%;
    left: 50px;
    top: 15%;
    border: none;
    font-size: 13px;
    user-select: none;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: transparent;

    &:focus {
        outline: none;
    }
`;

export const SwitchSearchIcon = styled(FaStreetView)`
    position: absolute;
    right: 45px;
    font-size: 28px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    &:hover {
        cursor: pointer;
    }
`;

export const SwitchSearchIconTwo = styled(GiStreetLight)`
    position: absolute;
    right: 45px;
    font-size: 28px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    &:hover {
        cursor: pointer;
    }
`;

/** Search icon **/
export const SearchIcon = styled(MdSearch)`
    position: absolute;
    right: 10px;
    font-size: 28px;

    color: ${(props) => (props.isdark ? Yellow : Black)};

    &:hover {
        cursor: pointer;
    }
`;

export const SpinnerContainer = styled.div`
    position: absolute;
    right: 10px;
    width: 7%;
    height: auto;
    display: flex;
    align-items: center;
`;
