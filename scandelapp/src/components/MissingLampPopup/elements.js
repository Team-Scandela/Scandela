import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const PopupWindow = styled.div`
    position: absolute;
    top: 50%;
    left: 10px;
    width: 380px;
    max-height: 400px; // Ajoutez une hauteur maximale si nécessaire
    padding: 20px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Yellow + 'FF'};
    border-radius: 30px;
    display: flex;
    flex-direction: column;
`;

export const PopupTextInfoTitle = styled.div`
    text-align: center;
`;

export const TextInput = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.isdark ? Black + 'CC' : White + 'CC'};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 11px;
    color: ${Yellow};
`;
