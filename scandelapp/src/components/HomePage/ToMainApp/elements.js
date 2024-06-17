import styled from 'styled-components';
import { Yellow, Black } from '../../../colors';

export const ToMainAppContainer = styled.div`
    display: flex;
`;

export const ToMainAppRectangle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color : ${Yellow};
    color: ${Black};
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
`;

