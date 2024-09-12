import { Yellow, Black, White } from '../../colors';
import { AiOutlineDownload } from 'react-icons/ai';
import styled from 'styled-components';

export const LegendContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    animation: fadeOut 3s forwards;

    @media (max-width: 992px) {
        padding: 8px;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        padding: 6px;
        font-size: 12px;
        top: 5px;
    }

    @media (max-width: 576px) {
        padding: 5px;
        font-size: 10px;
        top: 2px;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
