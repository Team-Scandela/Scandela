import styled from 'styled-components';
import { Yellow, Black } from '../../../../colors';

export const LoadingTitle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 40%;
    left: 15%;
    font-size: 20px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
    font-family: 'SyneRegular';
`;

export const NotificationTitle = styled.div`
    display: flex;
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    font-size: 17px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 500;
    font-family: 'SyneRegular';
`;

/** Sub title on the content container */
export const SubTitleText = styled.div`
    display: flex;
    position: absolute;
    top: 80%;
    left: 40%;
    font-size: 25px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 500;
    font-family: 'SyneRegular';
`;
