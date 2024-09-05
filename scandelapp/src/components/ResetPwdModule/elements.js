import styled from 'styled-components';
import { Black, Yellow, DarkYellow, Grey, DarkGrey } from '../../colors';

export const ResetPwdPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${Black};
`;

export const ResetPwdContainer = styled.div`
    position: absolute;
    align-items: center;
    background-color: ${DarkGrey};
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    width: 450px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const ResetPwdForm = styled.form`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px 50px;
    text-align: center;
    background-color: ${DarkGrey};
`;

export const ResetPwdTitle = styled.h2`
    font-weight: bold;
    margin-bottom: 20px;
    color: ${Yellow};
`;

export const ResetPwdInput = styled.input`
    background-color: ${Grey};
    border: none;
    border-radius: 20px;
    margin: 10px 0;
    padding: 10px;
    width: 100%;
`;

export const ResetPwdButton = styled.button`
    background-color: ${Yellow};
    border: none;
    border-radius: 20px;
    color: ${Black};
    cursor: pointer;
    font-weight: bold;
    margin: 10px 0;
    padding: 10px;
    width: 40%;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${DarkYellow};
    }
`;

export const ResetPwdLink = styled.a`
    color: ${Yellow};
    cursor: pointer;
    font-weight: bold;
    margin: 10px 0;
    text-decoration: none;

    &:hover {
        color: ${DarkYellow};
    }
`;
