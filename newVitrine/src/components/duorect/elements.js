import styled from 'styled-components';
import { White, Black, Grey, Yellow, DarkGrey } from '../../colors';

export const DuoRectContainer = styled.div`
    display: flex;
    flex-direction: line;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${White};
    border-radius: 10px;
    height: 500px;
    text-align: center;
`;

export const RectColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${White};
    border-radius: 10px;
    transition: 0.3s;
    width: 100%;
    height: 400px;
    text-align: center;
`;

export const RectPic = styled.img`
    width: 200px;
    border-radius: 10px;
`;

export const RectTitle = styled.h3`
    font-size: 54px;
    color: ${Black};
`;

export const RectText = styled.p`
    font-size: 20px;
    padding-top: 20px;
    color: ${DarkGrey};
`;