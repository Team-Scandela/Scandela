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
    width: 450px; /* Largeur initiale */
    height: 40px;
    top: 25px; /* Position verticale */
    left: 30px; /* Position horizontale */
    background-color: ${(props) =>
        props.isdark ? Black + 'CC' : White + 'CC'};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    padding: 0 10px; /* Espace intérieur */
    
    @media screen and (max-width: 768px) {
        width: 60%; /* Ajustement pour les écrans moyens */
    }
    
    @media screen and (max-width: 480px) {
        width: 30%; /* Ajustement pour les écrans petits */
    }
`;

/** Container that contains the scandela logo **/
export const LogoContainer = styled.img`
    height: 100%;
    padding: 5px;
    user-select: none;
`;

/** Container that contains the input to write in the searchbar**/
export const InputWrapper = styled.input`
    flex: 1; /* Expansion pour remplir l'espace restant */
    width: 100%;
    height: 100%;
    border: none;
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: transparent;

    &:focus {
        outline: none;
    }

    @media screen and (max-width: 768px) {
        font-size: 12px; /* Ajustement pour les écrans moyens */
    }
`;

export const SwitchSearchIcon = styled(FaStreetView)`
    font-size: 28px;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    &:hover {
        cursor: pointer;
    }
`;

export const SwitchSearchIconTwo = styled(GiStreetLight)`
    font-size: 28px;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    &:hover {
        cursor: pointer;
    }
`;

/** Search icon **/
export const SearchIcon = styled(MdSearch)`
    font-size: 28px;
    color: ${(props) => (props.isdark ? Yellow : Black)};
    &:hover {
        cursor: pointer;
    }
`;

export const SpinnerContainer = styled.div`
    width: 7%;
    height: auto;
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 480px) {
        display: none; /* Cacher sur les écrans petits */
    }
`;
