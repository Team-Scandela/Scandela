import styled from 'styled-components';
import { FaBolt } from 'react-icons/fa'; // Import de l'icône éclair

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

export const LeafIcon = styled(FaBolt)`
    // Remplacement par l'icône d'éclair
    color: #ffd700;
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
    outline: 1px solid red;
`;

export const LegendWrapper = styled.div`
    position: relative;
    padding: 20px;
    background-color: #666666;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    outline: 1px solid red;
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
    outline: 1px solid red;
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
    outline: 1px solid red;
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
    outline: 1px solid red;
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
    outline: 1px solid red;
    width: 60%;
`;
