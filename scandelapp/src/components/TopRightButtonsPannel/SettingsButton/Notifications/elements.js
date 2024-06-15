// import styled from 'styled-components';
// import { Yellow, Black } from '../../../../colors';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const NotificationTitle = styled.div`
//     display: flex;
//     position: absolute;
//     top: ${(props) => props.top};
//     left: ${(props) => props.left};
//     font-size: 17px;
//     user-select: none;
//     color: ${(props) => (props.isDark ? Yellow : Black)};
//     font-weight: 500;
// `;
import styled, { keyframes } from 'styled-components';
import { Yellow, Black } from '../../../../colors';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LoadingTitle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 15%;
    font-size: 20px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: 700;
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
`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
    accent-color: ${(props) => (props.isDark ? Yellow : Black)};
    margin-right: 10px;
`;

export const CustomLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    user-select: none;
    font-size: 14px;
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
`;

export const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: ${spin} 1s ease infinite;
`;
