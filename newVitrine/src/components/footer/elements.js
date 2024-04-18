import styled from 'styled-components'
import { Yellow, Black, White } from '../../colors';

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: line;
    // ch

    height: 250px;
    padding: 0 10px;
    background-color: ${Black};
    color: ${White};
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    left: 0;
    right: 0;
`;

export const FooterColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
    padding: 30px;
`;

export const FooterTitle = styled.h1`
    color: ${Yellow};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
`;

export const FooterText = styled.p`
    color: ${White};
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
`;