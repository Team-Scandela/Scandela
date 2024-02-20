import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

interface LoginModuleProps {
    updateUserInfo: (newInfo: any) => void;
}

/** Login module who allow to sign in up. You can slide the overlay from left to right (or the opposite) to acess to the side wanted */
const LoginModule: React.FC<LoginModuleProps> = ({
    updateUserInfo,
}) => {
    const [signInPage, setSignInPage] = useState(true);

    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [passwordConfirmSignUp, setPasswordConfirmSignUp] =
        useState('');

    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const navigate = useNavigate();

    const handleValidLogin = () => {
        navigate('/');
    }

    const handleSubmitSignIn = async (event: any) => {
        event.preventDefault();

        const encodedCredentials = btoa('tester:T&st');
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        });

        try {
            const response = await fetch('https://serverdela.onrender.com/users/signin', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    email: emailSignIn,
                    password: passwordSignIn,
                 }),
            });

            if (!response.ok) {
                throw new Error('La connexion a échoué');
            }

            const data = await response.json();
            // console.log(data);
            updateUserInfo({id: data.id, town: data.town, email: data.email, username: data.username,
                password: data.password, role: data.role, moreInformations: data.moreInformations,
                darkmode: data.darmode, lastConnexion: data.lastConnexion, decisions: data.decisions })
            handleValidLogin();
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    const handleSubmitSignUp = async (event: any) => {
        if (passwordSignUp != "" && (passwordSignUp == passwordConfirmSignUp)) {
            event.preventDefault();

            const encodedCredentials = btoa('tester:T&st');
            const headers = new Headers({
                'Content-Type': 'application/json',
                Authorization: `Basic ${encodedCredentials}`,
            });

            try {
                const response = await fetch('https://serverdela.onrender.com/users/create', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        town: {id : 1},
                        email: emailSignUp,
                        username: usernameSignUp,
                        password: passwordSignUp,
                    }),
                });

                if (!response.ok) {
                    throw new Error("L'inscription a échoué");
                }

                const data = await response.json();
                // console.log(data);
                updateUserInfo({id: data.id, town: data.town, email: data.email, username: data.username,
                    password: data.password, role: data.role, moreInformations: data.moreInformations,
                    darkmode: data.darmode, lastConnexion: data.lastConnexion, decisions: data.decisions })
                handleValidLogin();
            } catch (error) {
                console.error("Erreur lors de l'inscription", error);
            }
        }
    };

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
                        placeholder="Email"
                        value={emailSignIn}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmailSignIn(e.target.value)
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
                            Sign Up
                        </GhostButton>
                    </LeftOverlayPanel>

                    <RightOverlayPanel signinIn={signInPage}>
                        <Title>Hello !</Title>
                        <Paragraph>
                            Enter Your personal details and start the
                            Scandelaventure
                        </Paragraph>
                        <GhostButton onClick={() => setSignInPage(false)}>
                            Sign In
                        </GhostButton>
                    </RightOverlayPanel>
                </Overlay>
            </OverlayContainer>
        </LoginContainer>
    );
};

export default LoginModule;
