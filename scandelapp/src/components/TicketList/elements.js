import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';

export const TicketListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    gap: 10px;
    user-select: none;
`;

export const TicketContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: ${White};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    user-select: none;
    padding: 0 0 0 10px;

    &:hover {
        filter: brightness(0.9);
    }
`;

export const TicketInfoContainer = styled.div`
    background-color: ${props => props.color};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 100%;
    padding: 0 0 0 10px;
`;

export const TicketHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 30%;
`;

export const TicketTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${Black};
    user-select: none;
`;

export const TicketCategory = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: ${Black};
    user-select: none;
`;

export const TicketDescription = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: ${Black};
    user-select: none;
    width: 65%;
`;

export const TicketDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    width: 15%;
`;

export const TicketClient = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: ${Black};
    user-select: none;
    width: 15%;
    cursor: pointer;
`;

export const TicketStatusDropdown = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15%; // Set the width for TicketStatus
    height: 100%;
    padding: 0 0 0 10px;
    user-select: none;
    cursor: pointer;
`;

export const TicketStatusItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin-left: 10px;
    min-width: 10%;
    text-align: center;
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: ${Yellow};
    }
`;
