import styled from 'styled-components';
import { Yellow, DarkYellow, DarkGrey, Black } from '../../colors';

export const TitleContainer = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: ${Yellow};
    text-align: center;
    margin-bottom: 20px;
    background: ${DarkGrey};
    background: linear-gradient(to right, ${Yellow}, ${DarkYellow});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px 0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${Black};
`;
