import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const ProfilMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 350px;
    background-color: ${(props) => (props.isDark ? Black + 'CC' : White + 'CC')};
    position: fixed;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 90px;
    right: 200px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    z-index: 2;
    margin: 10px; /* Ajoutez une marge de 10px autour du conteneur */
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 30px;
    line-height: 1.5;
    text-align: center;
    user-select: none;
`;

export const ProfileField = styled.div`
    display: flex;
    align-items: center;
    width: 95%;
    padding: 10px 0;
    margin-left: 5px;
    margin-bottom: 10px;
    margin-right: 5px;
    user-select: none;
`;

export const EditButton = styled.button`
    background-color: ${(props) => (props.isDark ? White : Black)};
    color: ${(props) => (props.isDark ? Black : White)};
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: auto;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
    margin-top: 10px; /* Ajoutez une marge de 10px en haut du bouton */
`;
