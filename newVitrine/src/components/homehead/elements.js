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
    background: linear-gradient(180deg, rgba(42, 43, 42, 1) 1%, rgba(74, 76, 74, 1) 15%, rgba(100, 103, 100, 1) 30%, rgba(119, 123, 119, 1) 45%, rgba(139, 143, 139, 1) 60%, rgba(167, 173, 167, 1) 75%, rgba(203, 210, 203, 1) 90%, rgba(249, 249, 249, 1) 100%);
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
