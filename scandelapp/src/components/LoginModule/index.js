import React, { useState } from 'react'
import { LoginContainer, SignUpContainer, SignInContainer, Form, Title, Input, Button, Anchor, OverlayContainer, Overlay, LeftOverlayPanel, RightOverlayPanel, Paragraph, GhostButton } from './elements'

/** Login module wh allow to sign in up. You can slide the overlay from left to right (or the opposite) to acess to the side wanted */
const LoginModule = () => {

    /** if the page is on sign in or sign up */
    const [onSignInPage, setOnSignInPage] = React.useState(true);

    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [passwordConfirmSignUp, setPasswordConfirmSignUp] = useState('');

    const [usernameSignIn, setUsernameSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');

    /** handle click of the submit sign up button */
    const handleSubmitSignUp = () => {
    };

    /** handle click of the submit sign in button */
    const handleSubmitSignIn = () => {
    };

    return (
        <LoginContainer>
            <SignUpContainer onSignInPage={onSignInPage}>
                <Form>
                    <Title>Create Account</Title>
                    <Input
                        type='text'
                        placeholder='Name'
                        value={usernameSignUp}
                        onChange={(e) => setUsernameSignUp(e.target.value)}
                    />
                    <Input
                        type='email'
                        placeholder='Email'
                        value={emailSignUp}
                        onChange={(e) => setEmailSignUp(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={passwordSignUp}
                        onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        value={passwordConfirmSignUp}
                        onChange={(e) => setPasswordConfirmSignUp(e.target.value)}
                    />
                    <Button onClick={handleSubmitSignUp}> Sign Up </Button>
                </Form>
            </SignUpContainer>

            <SignInContainer onSignInPage={onSignInPage}>
                <Form>
                    <Title>Sign In</Title>
                    <Input
                        type='text'
                        placeholder='Username'
                        value={usernameSignIn}
                        onChange={(e) => setUsernameSignIn(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={passwordSignIn}
                        onChange={(e) => setPasswordSignIn(e.target.value)}
                    />
                    <Anchor href='#'>Forgot your password?</Anchor>
                    <Button onClick={handleSubmitSignIn}> Sign In </Button>
                </Form>
            </SignInContainer>

            <OverlayContainer signinIn={onSignInPage}>
                <Overlay signinIn={onSignInPage}>

                    <LeftOverlayPanel signinIn={onSignInPage}>
                        <Title>Welcome Back!</Title>
                        <Paragraph> To keep connected with us please login</Paragraph>
                        <GhostButton onClick={() => setOnSignInPage(true)}>Sign In</GhostButton>
                    </LeftOverlayPanel>

                    <RightOverlayPanel signinIn={onSignInPage}>
                        <Title>Hello !</Title>
                        <Paragraph>Enter Your personal details and start the Scandelaventure</Paragraph>
                        <GhostButton onClick={() => setOnSignInPage(false)}>Sigin Up</GhostButton>
                    </RightOverlayPanel>

                </Overlay>
            </OverlayContainer>


        </LoginContainer>
    )
}

export default LoginModule
