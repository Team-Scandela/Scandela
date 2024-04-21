import styled from 'styled-components';
import { White, Black, Grey, Yellow } from '../../colors';

export const HomeContactContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background-color: ${White};
    border-radius: 10px;
    height: 300px;
    text-align: center;
    padding-top: 50px;
`;

export const HomeContactCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    border-radius: 10px;
    background-color: ${Black};
    width : 50%;
    height: 200px;
`;

export const HomeContactTitle = styled.h1`
    font-size: 54px;
    color: ${White};
`;

export const HomeContactText = styled.p`
    font-size: 20px;
    padding-top: 20px;
    color: ${Grey};
    padding-bottom: 20px;
`;

export const HomeContactButton = styled.button`
    color: ${Black};
    border: none;
    cursor: pointer;
    width: 200px;
    height: 150px;
    border-radius: 10px;
    transition: 0.3s;
    font-size: 15px;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap : 10px;
    background-color: ${Yellow};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

    &:hover {
        background-color: ${Grey};
    }
`;