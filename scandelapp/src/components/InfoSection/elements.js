import styled from 'styled-components';
import { Grey, Black, White, DarkGrey } from '../../colors';

export const InfoSectionContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: ${Grey};
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InfoParagraph = styled.p`
    margin: 0;
    font-size: 16px;
    color: ${Black};
    line-height: 1.6;
    text-align: center;
`;
