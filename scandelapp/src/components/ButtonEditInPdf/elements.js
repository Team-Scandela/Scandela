import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import { AiOutlineDownload } from 'react-icons/ai';

/** Container for the background of the searchbar **/
export const ButtonEditContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    top: 25px;
    left: 65%;
    background-color: ${(props) =>
        props.isClicked
            ? props.isDark
                ? Yellow + 'FF'
                : Grey + 'FF'
            : props.isDark
              ? Grey + 'FF'
              : Grey + 'FF'};
    border-radius: 10px;
    transition: opacity 0.1s;

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isClicked
                ? props.isDark
                    ? Yellow + 'CC'
                    : Grey + 'CC'
                : props.isDark
                  ? White + 'CC'
                  : Black + 'CC'};
    }
`;

/**  Export Icon**/
export const ExportIcon = styled(AiOutlineDownload)`
    position: absolute;
    align-items: center;
    font-size: 40px;
    /* color: ${(props) => (props.isDark ? Black : Yellow)}; */
    color: ${(props) =>
        props.isClicked
            ? props.isDark
                ? White
                : Yellow
            : props.isDark
              ? Black
              : Yellow};
`;
