import styled from 'styled-components';
import { DarkGrey, Black, White } from '../../colors';

export const DuoTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
    background-color: ${White};
`;

export const DuoTextTitle = styled.h1`
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 20px;
    color: ${Black};
    text-align: center;
    white-space: pre-wrap;
    line-height: 1.5;
`;

export const DuoTextText = styled.p`
    font-size: 20px;
    text-align: center;
    color: ${DarkGrey};
`;
