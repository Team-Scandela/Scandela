import styled, { keyframes } from 'styled-components';

export const fadeInOut = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`;

export const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

export const LogoContainer = styled.div`
    animation: ${fadeInOut} 2s linear infinite;
`;
