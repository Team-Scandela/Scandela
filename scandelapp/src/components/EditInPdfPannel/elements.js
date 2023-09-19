import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';
import { AiOutlineDownload } from 'react-icons/ai';

/** Container for the background of the searchbar **/
export const PannelContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 700px;
    height: 180px;
    top: 75%;
    left: 10%;
    background-color: ${(props) =>
        props.isDark ? White + 'CC' : Black + 'CC'};
    border-radius: 10px;
    opacity: ${(props) => (props.isButtonEditInPdfClicked ? 1 : 0)};
    transition: all 0.3s ease-in-out;
`;

export const PannelText = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 35px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    font-weight: 600;
`;

export const ExportButton = styled.div`
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 50px;
    top: 100px;
    left: 30px;
    right: 30px;
    background-color: ${(props) =>
        props.isDark ? White + 'FF' : Black + 'FF'};
    border-radius: 5px;
    box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.4);
`;

export const ExportText = styled.div`
    position: absolute;
    left: 15px;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    font-weight: 400;
    top: 50%;
    transform: translateY(-50%);
`;

export const ExportIcon = styled(AiOutlineDownload)`
    position: absolute;
    align-items: center;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    opacity: 1;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;
