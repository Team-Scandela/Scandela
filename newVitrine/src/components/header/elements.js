import styled from 'styled-components';
import { Black, White } from '../../colors';

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    background-color: ${Black};
    gap : 20px;
`;

export const HeaderTitle = styled.h1`
    font-size: 30px;
    color: ${White};
`;

export const HeaderText = styled.p`
    font-size: 18px;
    padding-top: 10px;
    color: ${White};
`;