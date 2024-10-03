import styled from 'styled-components';
import { Black, White, Yellow } from '../../colors';

export const HomeHeadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 200px;
    left: 0;
    right: 0;
    background-color: ${Black};
    line-height: 0.1;
`;

export const HomeHeadTitle = styled.h1`
    color: ${Yellow};
    font-size: 80px;
    font-weight: 700;
    user-select: none;
    z-index: 2;
`;

export const HomeHeadSubtitle = styled.h2`
    color: ${White};
    font-size: 20px;
    font-weight: 400;
    margin-top: 60px;
    user-select: none;
    z-index: 2;
`;
