import styled  from 'styled-components';
import { Black, White, Yellow, Grey } from '../../colors';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    background-color: ${White};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s ease;
    &:hover {
        box-shadow: 0px 0px 20px 0px ${Grey};
    }
`;

export const CardPic = styled.img`
    width: 200px;
    border-radius: 10px;
`;

export const CardTitle = styled.h3`
    font-size: 35px;
    color: ${Black};
`;

export const CardText = styled.p`
    font-size: 20px;
    padding-top: 10px;
    color: ${Black};
`;