import styled from 'styled-components';
import { FaRegCircle } from 'react-icons/fa';

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    opacity: 0.7;
    z-index: 10000000;

    background-color: #444444;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    position: fixed;
    bottom: 75px;
    left: 30px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

export const CircleIcon = styled(FaRegCircle)`
    color: #ffd700; /* Yellow color for the circle */
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
    z-index: 10000000000;
`;

export const ModalWrapper = styled.div`
    background-color: #444444;
    padding: 20px;
    border-radius: 10px;
    height: 530px;
    max-width: 800px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
     
`;

export const LegendWrapper = styled.div`
    position: relative;
    padding: 20px;
    background-color: #666666;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
     
`;

export const ExampleWrapper = styled.div`
    position: relative;
    padding: 20px;
    top: 20px;
    background-color: #666666;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    height: 250px;
     
`;

 export const IconsExplanationsWrapper = styled.div`
    position: relative;
    padding: 20px;
    left: 520px;
    bottom: 399px;
    background-color: #666666;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    max-width: 250px;
    width: 100%;
    height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    text-align: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    img {
        width: 40px;
        height: auto;
    }

    span {
        font-size: 14px;
        color: #ffffff;
    }
`;

export const CloseWrapper = styled.div`
    position relative;
    padding: 15px;
    background color: #666666;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    left: 730px;
    top: 2px;
    width: 10px;
    height: 10px;
     
`

export const CloseButton = styled.button`
    position: relative;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    right: 6px;
    bottom: 6px;
    color: white;

    &:hover {
        color: yellow;
    }
`;

export const p = styled.p`
    color: #d5b60a;
`;

export const h2 = styled.h2`
    position: relative;
    color: white;
    padding-bottom: 5px;
    bottom: 30px;
    right: 5px;
     
    width: 60%;
`;
