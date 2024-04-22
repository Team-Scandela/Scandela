import styled from 'styled-components';
import { Black, White, Yellow, DarkerGrey } from '../../colors';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    background-color: ${White};
    height: 150px;
    width: 300px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

export const CardPic = styled.div`
    font-size: 25px;
`;

export const CardTitle = styled.h3`
    font-size: 25px;
    color: ${Black};
`;

export const CardText = styled.p`
    font-size: 17px;
    padding-top: 10px;
    color: ${DarkerGrey};
`;