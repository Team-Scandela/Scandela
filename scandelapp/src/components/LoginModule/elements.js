import styled from 'styled-components';
import { DarkYellow, Yellow } from '../../colors';

/** Login container who contains the signup and signin container */
export const LoginContainer = styled.div`
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    width: 678%;
    max-width: 50%;
    min-height: 400px;
    left: 50%;
    transform: translate(-50%, 50%);
    font-family: 'SyneRegular';
`;

/** Sign up container, contains sign up infos */
export const SignUpContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    left: 0;
    transition: all 0.5s ease-in-out;
    opacity: 1;
    z-index: 1;
    font-family: 'SyneRegular';
`;

/** Sign in container, contains sign in infos */
export const SignInContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    left: 50%;
    transition: all 0.5s ease-in-out;
    opacity: 1;
    z-index: 1;
    font-family: 'SyneRegular';
`;

/** Form for SignIn / Sign Out */
export const Form = styled.form`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 50px;
    text-align: center;
    font-family: 'SyneRegular';
`;

/** Title of the container */
export const Title = styled.h1`
    font-weight: bold;
    margin: 3px;
    font-family: 'SyneBold';
`;

/** Input for username, password ... */
export const Input = styled.input`
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    font-family: 'SyneRegular';
`;

/** Button complete to validate sign in up */
export const Button = styled.div`
    border: none;
    border-radius: 20px;
    background-color: ${DarkYellow};
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 20px;
    font-family: 'SyneRegular';

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

/** Ghost button  for the overlay */
export const GhostButton = styled(Button)`
    border: 1px solid #fff;
    margin-top: 10px;
    font-family: 'SyneRegular';
`;

/** Anchor for forgotten password */
export const Anchor = styled.a`
    color: #333;
    font-size: 14px;
    text-decoration: underline;
    margin-top: 15px;
    font-family: 'SyneRegular';

    &:hover {
        color: ${Yellow};
        cursor: pointer;
    }
`;

export const ErrorMessage = styled.span`
    color: #f00020;
    font-size: 16px;
    margin: 15px 0;
    font-family: 'SyneRegular';
`;

/** Container for the overlay who covers the unused side */
export const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 999;
    font-family: 'SyneRegular';
    ${(props) =>
        props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

/** Overlay who covers the unused side */
export const Overlay = styled.div`
    background: ${DarkYellow};
    color: #eee;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    font-family: 'SyneRegular';
    ${(props) =>
        props.signinIn !== true ? `transform: translateX(50%);` : null}
`;

/** Rules for the texte inside the overlay */
export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    font-family: 'SyneRegular';
`;

/** Move the text during animation to the left */
export const LeftOverlayPanel = styled(OverlayPanel)`
    transform: translateX(-20%);
    ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

/** Move the text during animation to the right */
export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${(props) =>
        props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

/** Rules for the <p> */
export const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 10px 30px;
    font-family: 'SyneRegular';
`;
