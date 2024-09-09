import styled from 'styled-components';
import { Grey, Green, Yellow, Red, White, DarkYellow } from '../../colors';

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    margin: 10px;
`;

    export const Card = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    margin: 10px;
    flex: 1 1 calc(33% - 20px); /* Adjusted for 3 cards in a row */
    display: flex;
    align-items: center;
    background-color: ${Grey};
    min-width: 160px; /* Adjusted to ensure 3 cards can fit */
    max-width: 200px; /* Adjusted to ensure 3 cards can fit */
`;

export const CardContent = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const CardIcon = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
c`;

export const CardTitle = styled.h3`
    margin: 0;
    font-size: 14px;
    color: #333;
    text-align: left;
`;

export const CardValue = styled.p`
    margin: 0;
    font-size: 18px;
    color: ${Yellow}
    text-align: left;
    font-weight: bold;
`;
