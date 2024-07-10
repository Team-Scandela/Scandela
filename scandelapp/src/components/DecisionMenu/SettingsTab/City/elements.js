import styled from 'styled-components';
import { Yellow, Black, DarkYellow } from '../../../../colors';
import { IoMdDownload } from "react-icons/io";

export const ImportButton = styled(IoMdDownload)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: 80px;
    top: 150px;
    color: ${(props) => (props.isDark ? Yellow : Black)};

    &:hover {
        cursor: pointer;
        height: 85px;
        width: 85px;
    }
`;

export const DescriptionText = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 10%;
    font-size: 16px;
    user-select: none;
    color: ${(props) => (props.isDark ? DarkYellow : Black)};
    font-weight: 700;
    margin-left: 10px;
    margin-right: 40px;
    font-family: 'SyneRegular';
`;

export const TooltipTitle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 76%;
    left: 18%;
    font-size: 20px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 400;
    font-family: 'SyneRegular';
`;
