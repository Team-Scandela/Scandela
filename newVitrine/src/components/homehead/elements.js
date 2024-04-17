import styled from 'styled-components';
import { Black, White, Yellow } from '../../colors';

export const HomeHeadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 700px;
    width: 130%;
    background-color: ${Black};
    line-height: 0.1;
`;

export const HomeHeadTitle = styled.h1`
    color: ${Yellow};
    font-size: 80px;
    font-weight: 700;
    margin-top: -100px;
`;

export const HomeHeadSubtitle = styled.h2`
    color: ${White};
    font-size: 20px;
    font-weight: 400;
`;
