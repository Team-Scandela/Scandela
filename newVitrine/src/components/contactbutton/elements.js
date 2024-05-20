import styled from 'styled-components';
import { Yellow, Black, White, DarkGrey, Grey } from '../../colors';

export const ContactButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
    color: ${White};
    font-size: 14px;
    font-weight: 600;
    left: 0;
    right: 0;
    z-index: 100;
    padding-bottom: 30px;
`;

export const ContactButtonMain = styled.button`
    color: ${Black};
    border: none;
    cursor: pointer;
    width: 300px;
    height: 150px;
    border-radius: 10px;
    transition: 0.3s;
    font-size: 15px;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    background-color: ${White};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: ${Grey};
    }

    &:active {
        background-color: ${Yellow};
    }
`;

export const ContactButtonIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-size: 20px;
    color: ${Black};
    background-color: ${Yellow};
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;
