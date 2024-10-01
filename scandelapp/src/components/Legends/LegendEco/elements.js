import styled from 'styled-components';
import { FaLeaf } from 'react-icons/fa';

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #333;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    position: fixed; /* Make sure it stays on top */
    bottom: 80px; /* Adjust as needed */
    left: 30px; /* Adjust as needed */
    z-index: 1000; /* Make sure it's on top of other elements */

    &:hover {
        background-color: #444444;
    }
`;

export const LeafIcon = styled(FaLeaf)`
    color: #FFD700;
    font-size: 24px;
`;

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalWrapper = styled.div`
    background-color: #444444;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;

    &:hover {
        color: yellow;
    }
`;

export const p = styled.p`
    color: #D5B60A;
`;

export const h2 = styled.h2`
    color: white;
`;