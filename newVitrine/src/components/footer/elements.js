import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';

export const FooterContainer = styled.footer`
    display: flex;
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
    flex-direction: column;
    margin: 20px;
    padding: 30px;
`;

export const FooterTitle = styled.h1`
    color: ${Yellow};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    user-select: none;
    margin-top: -10px;
`;

export const FooterText = styled.p`
    color: ${White};
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    user-select: none;
`;

export const FooterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: ${White};
        color: ${Black};
    }
    transition: 0.3s;
`;

export const FooterLogo = styled.div`
    margin: 10px;
    user-select: none;
`;
