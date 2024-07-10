import styled from 'styled-components';
import { Yellow, Black, White, DarkYellow, DarkGrey } from '../../../colors';
import { MdAddCircle } from 'react-icons/md';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';

export const LampsPanelButtonContainer = styled(MdAddCircle)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    right: 475px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Yellow
                : Black
            : props.isDark
              ? Black + 'CC'
              : White + 'CC'};
    color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Black
                : White
            : props.isDark
              ? Yellow
              : Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

export const LampsPanelContainer = styled.div`
    display: flex;
    position: fixed;
    width: 600px;
    height: 420px;
    background-color: ${(props) => (props.isDark ? Yellow : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 90px;
    left: 500px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;

export const ButtonsMenuContainer = styled.div`
    display: flex;
    position: relative;
    width: 110px;
    height: 400px;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 10px;
    left: 10px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 460px;
    height: 400px;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 10px;
    left: 20px;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow-y: auto; /* Ajouté pour permettre le défilement vertical */
    padding: 10px;
`;

export const LampListContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 4%;
    top: 13%;
    width: 400px;
    height: 77%;
    overflow-y: auto;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Yellow + 'FF'};
`;

export const LampListItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${(props) => (props.isDark ? DarkGrey : White)};
    border: 1px solid ${(props) => (props.isDark ? Yellow : Black)};
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    height: 50px; /* Hauteur fixe pour les éléments de la liste */
    flex-shrink: 0; /* Empêche les éléments de rétrécir */
`;

export const TitleText = styled.div`
    position: relative;
    top: 5%;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transform: perspective(10px) rotateX(2deg);
    letter-spacing: 2px;
    background: linear-gradient(to right, ${Yellow}, #ffd700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

export const SearchBar = styled.input`
    display: flex;
    width: 100%;
    padding: 5px;
    border: 1px solid ${(props) => (props.isDark ? Yellow : Black)};
    border-radius: 5px;
    background-color: ${(props) => (props.isDark ? DarkGrey : White)};
    color: ${(props) => (props.isDark ? White : Black)};
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${(props) => (props.isDark ? DarkYellow : Black)};
    }
`;

export const FilterButton = styled.div`
    /* Styles pour le bouton de filtre */
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${Yellow};

    &:hover {
        opacity: 0.9;
    }
`;

export const FilterIconDesc = styled(AiOutlineSortDescending)`
    /* Styles pour l'icône de filtre */
    color: ${Yellow};
`;

export const FilterIconAsc = styled(AiOutlineSortAscending)`
    /* Styles pour l'icône de filtre */
    color: ${Yellow};
`;