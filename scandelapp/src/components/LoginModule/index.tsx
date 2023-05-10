import * as React from 'react'
import { LoginContainer, SignUpContainer, SignInContainer, Form, Title, Input, Button, Anchor, OverlayContainer, Overlay, LeftOverlayPanel, RightOverlayPanel, Paragraph, GhostButton } from './elements'

const LoginModule: React.FC = () => {
    const [onSignInPage, setOnSignInPage] = React.useState(true);

    const [usernameSignUp, setUsernameSignUp] = React.useState('');
    const [emailSignUp, setEmailSignUp] = React.useState('');
    const [passwordSignUp, setPasswordSignUp] = React.useState('');
    const [passwordConfirmSignUp, setPasswordConfirmSignUp] = React.useState('');

    const [usernameSignIn, setUsernameSignIn] = React.useState('');
    const [passwordSignIn, setPasswordSignIn] = React.useState('');

    const handleSubmitSignUp = () => {
    };

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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameSignIn(e.target.value)}
                    />
                    <Input
                        type='email'
                        placeholder='Email'
                        value={emailSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSignUp(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={passwordSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordSignUp(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        value={passwordConfirmSignUp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmSignUp(e.target.value)}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameSignIn(e.target.value)}
                        />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={passwordSignIn}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordSignIn(e.target.value)}
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
