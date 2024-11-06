import styled from 'styled-components';
import { Yellow, Black, DarkYellow, DarkGrey } from '../../../../colors';
import { IoMdDownload } from 'react-icons/io';

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
    top: 20%;
    left: 18%;
    font-size: 20px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 400;
    font-family: 'SyneRegular';
`;

/** Container for the restart tutoriel button **/
export const RestartTutoButtonContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 32%;
    left: 17%;
    height: 45px;
    width: 200px;
    padding: 0 10px;
    background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border-radius: 5px;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.75);

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
        color: ${(props) => (props.isDark ? Black : Black)};
    }
`;

export const TutorielTitle = styled.div`
    font-size: 20px;
    user-select: none;
    font-weight: 400;
    font-family: 'SyneRegular';
`;
