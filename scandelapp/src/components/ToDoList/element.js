import styled from 'styled-components';
import {
    DarkGrey,
    Black,
    LightDarkGrey,
    White,
    Yellow,
    Red,
    Green,
} from '../../colors';

export const ToDoListWrapper = styled.div`
    display: flex;
    background-color: ${Black};
    width: 100%;
    height: 100vh;
    justify-content: center;
`;

export const ToDoListContainer = styled.div`
    display: flex;
    position: absolute;
    top: 55%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 75%;
    background-color: ${DarkGrey};
    gap: 20px;
    padding: 20px;
    max-height: 85%;
    overflow-y: auto;
    border-radius: 20px;
    transform: translateY(-50%);
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${White + '99'};
        border-radius: 10px;
    }
`;

export const ToDoListCard = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    background-color: ${LightDarkGrey};
    height: 200px;
    padding: 10px;
    gap: 10px;
    transition: background-color 0.3s;
    min-height: 200px;
    border-radius: 10px;

    &:hover {
        background-color: ${LightDarkGrey + '99'};
    }
`;

export const ToDoListCheckBox = styled.input`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    cursor: pointer;
    border: none;
`;

export const ToDoListTitle = styled.div`
    position: absolute;
    font-size: 30px;
    color: ${Black};
    font-weight: bold;
    top: 25%;
    left: 300px;
    transform: translateY(-50%);
`;

export const ToDoListDescription = styled.div`
    position: absolute;
    font-size: 25px;
    color: ${Black};
    top: 50%;
    left: 300px;
    transform: translateY(-50%);
`;

export const ToDoListAdress = styled.div`
    position: absolute;
    font-size: 25px;
    color: ${Black};
    top: 75%;
    left: 300px;
    transform: translateY(-50%);
    font-style: italic;
`;

export const ToDoListMainTitle = styled.div`
    position: absolute;
    font-size: 45px;
    color: ${Yellow};
    top: 20px;
    font-family: 'SyneBold';
`;

export const ToDoListDropdown = styled.div`
    position: absolute;
    width: 200px;
    height: 55px;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    border-radius: 10px;
    transition: background-color 1s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: ${Black};
    font-family: 'SyneRegular';

    &:hover {
        cursor: pointer;
    }
`;

export const ToDoListDropdownMenu = styled.div`
    display: flex;
    position: absolute;
    top: 0%;
    left: 40px;
    width: 200px;
    height: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ToDoListDropdownMenuItem = styled.div`
    width: 100%;
    font-size: 30px;
    color: ${Black};
    cursor: pointer;
    padding: 10px;
    user-select: none;
    font-family: 'SyneRegular';

    &:hover {
        font-weight: bold;
    }
`;

export const ToDoListDropdownMenuItem1 = styled(ToDoListDropdownMenuItem)`
    background-color: ${Red};
    border-radius: 10px 10px 0px 0px;
`;

export const ToDoListDropdownMenuItem2 = styled(ToDoListDropdownMenuItem)`
    background-color: ${Yellow};
    border-radius: 0px 0px 0px 0px;
`;

export const ToDoListDropdownMenuItem3 = styled(ToDoListDropdownMenuItem)`
    background-color: ${Green};
    border-radius: 0px 0px 10px 10px;
`;

export const ErrorMessage = styled.div`
    position: absolute;
    font-size: 30px;
    color: ${Red};
    top: 10px;
    font-family: 'SyneRegular';
`;
