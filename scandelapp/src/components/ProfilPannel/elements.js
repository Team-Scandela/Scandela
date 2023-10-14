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
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 30px;
    line-height: 1.5;
    text-align: center;
`;

export const ProfileField = styled.div`
    display: flex;
    align-items: center;
    width: 95%;
    padding: 10px 0;
    margin-left: 5px;
    margin-bottom: 10px;
    margin-right: 5px;
`;


export const EditButton = styled.button`
    background-color: ${(props) => (props.isDark ? White : Yellow)};
    color: Black;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: auto;
    cursor: pointer; /* Définir le curseur comme un pointeur */
    transition: background-color 0.2s ease-in-out;
`;
