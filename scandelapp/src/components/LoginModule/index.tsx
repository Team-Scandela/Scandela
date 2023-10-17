import * as React from 'react';
import {
    LoginContainer,
    SignUpContainer,
    SignInContainer,
    Form,
    Title,
    Input,
    Button,
    Anchor,
    OverlayContainer,
    Overlay,
    LeftOverlayPanel,
    RightOverlayPanel,
    Paragraph,
    GhostButton,
} from './elements';

/** Login module who allow to sign in up. You can slide the overlay from left to right (or the opposite) to acess to the side wanted */
const LoginModule: React.FC = () => {
    const [signInPage, setSignInPage] = React.useState(true);

    const [usernameSignUp, setUsernameSignUp] = React.useState('');
    const [emailSignUp, setEmailSignUp] = React.useState('');
    const [passwordSignUp, setPasswordSignUp] = React.useState('');
    const [passwordConfirmSignUp, setPasswordConfirmSignUp] =
        React.useState('');

    const [usernameSignIn, setUsernameSignIn] = React.useState('');
    const [passwordSignIn, setPasswordSignIn] = React.useState('');

    /** handle click of the submit sign up button */
    const handleSubmitSignUp = () => {};

    /** handle click of the submit sign in button */
    const handleSubmitSignIn = () => {};

    return (
        <LoginContainer>
            <SignUpContainer signInPage={signInPage}>
                <Form id="signInForm">
                    <Title>Create Account</Title>
                    <Input
                        id="nameInputBox"
                        type="text"
                        placeholder="Name"
                        value={usernameSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsernameSignUp(e.target.value)
                        }
                    />
                    <Input
                        id="emailInputBox"
                        type="email"
                        placeholder="Email"
                        value={emailSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmailSignUp(e.target.value)
                        }
                    />
                    <Input
                        id="passwordInputBox"
                        type="password"
                        placeholder="Password"
                        value={passwordSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPasswordSignUp(e.target.value)
                        }
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirmSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPasswordConfirmSignUp(e.target.value)
                        }
                    />
                    <Button id={'signUpButton'} onClick={handleSubmitSignUp}>
                        {' '}
                        Sign Up{' '}
                    </Button>
                </Form>
            </SignUpContainer>

            <SignInContainer signInPage={signInPage}>
                <Form>
                    <Title>Sign In</Title>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={usernameSignIn}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsernameSignIn(e.target.value)
                        }
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={passwordSignIn}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPasswordSignIn(e.target.value)
                        }
                    />
                    <Anchor href="#">Forgot your password?</Anchor>
                    <Button onClick={handleSubmitSignIn}> Sign In </Button>
                </Form>
            </SignInContainer>

            <OverlayContainer signinIn={signInPage}>
                <Overlay signinIn={signInPage}>
                    <LeftOverlayPanel signinIn={signInPage}>
                        <Title>Welcome Back!</Title>
                        <Paragraph>
                            {' '}
                            To keep connected with us please login
                        </Paragraph>
                        <GhostButton onClick={() => setSignInPage(true)}>
                            Sign In
                        </GhostButton>
                    </LeftOverlayPanel>

                    <RightOverlayPanel signinIn={signInPage}>
                        <Title>Hello !</Title>
                        <Paragraph>
                            Enter Your personal details and start the
                            Scandelaventure
                        </Paragraph>
                        <GhostButton onClick={() => setSignInPage(false)}>
                            Sigin Up
                        </GhostButton>
                    </RightOverlayPanel>
                </Overlay>
            </OverlayContainer>
        </LoginContainer>
    );
};

export default LoginModule;
