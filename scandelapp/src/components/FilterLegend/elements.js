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
`;
