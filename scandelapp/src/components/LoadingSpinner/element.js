import styled, { keyframes } from 'styled-components';

const blinkAnimation = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    animation: ${blinkAnimation} 1s infinite; /* 1s pour la durée de l'animation */
`;
