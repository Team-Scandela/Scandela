import styled from 'styled-components';
import { DarkGrey, Black, LightDarkGrey, Grey } from '../../colors';

export const ToDoListWrapper = styled.div`
    display: flex;
    background-color: ${Black};
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

export const ToDoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width : 75%;
    background-color: ${DarkGrey};
    gap  : 20px;
    padding : 20px;
`;

export const ToDoListCard = styled.div`
    display: flex;
    position: relative;
    width : 100%;
    background-color: ${LightDarkGrey};
    height: 200px;
    padding : 10px;
    gap : 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${LightDarkGrey + '99'};
    }
`;

export const ToDoListCheckBox = styled.input`
    position: absolute;
    width: 40px;
    height: 40px;
    top : 50%;
    left : 20px;
    transform : translateY(-50%);
    cursor: pointer;
    border : none;
`;

export const ToDoListTitle = styled.div`
    position: absolute;
    font-size: 40px;
    color : ${Black};
    font-weight: bold;
    top : 25%;
    left : 100px;
    transform : translateY(-50%);
`;

export const ToDoListDescription = styled.div`
    position: absolute;
    font-size: 30px;
    color : ${Black};
    top : 50%;
    left : 100px;
    transform : translateY(-50%);
`;

export const ToDoListAdress = styled.div`
    position: absolute;
    font-size: 30px;
    color : ${Black};
    top : 75%;
    left : 100px;
    transform : translateY(-50%);
    font-style: italic;
`;



