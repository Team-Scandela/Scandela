import styled from 'styled-components';
import { White, Black, Grey, DarkerGrey, DarkGrey } from '../../colors';

export const DuoRectContainer = styled.div`
    display: flex;
    flex-direction: line;
    align-items: center;
    justify-content: center;
    background-color: ${White};
    border-radius: 10px;
    height: 400px;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 100px;
`;

export const RectColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.altBckg ? Grey : White};
    transition: 0.3s;
    width: 100%;
    height: 400px;
    text-align: center;
    padding: 50px;
`;

export const RectPic = styled.img`
    width: ${props => props.size};
    border-radius: 10px;
`;

export const RectTitle = styled.h3`
    font-size: 54px;
    color: ${Black};
`;

export const RectText = styled.p`
    font-size: 20px;
    padding-top: 20px;
    color: ${props => props.altBckg ? DarkerGrey : DarkGrey};
`;