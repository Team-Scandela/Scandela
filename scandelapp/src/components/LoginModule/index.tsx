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
import { setUserId } from '../../utils/userUtils';
import { optimisationTemplateDataBackup } from './backup_decisions';

interface LoginModuleProps {
    setOptimisationTemplateData: (data: any) => void;
    addItemToOptimisationTemplate: (data: any) => void;
}

/** Login module who allow to sign in up. You can slide the overlay from left to right (or the opposite) to acess to the side wanted */
const LoginModule: React.FC<LoginModuleProps> = ({
    setOptimisationTemplateData,
    addItemToOptimisationTemplate,
}) => {
    const [signInPage, setSignInPage] = useState(true);

    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [passwordConfirmSignUp, setPasswordConfirmSignUp] = useState('');

    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const navigate = useNavigate();

    const initUserSetup = async (data: any) => {
        localStorage.setItem('isDark', JSON.stringify(data.darkmode));
        if (data.rights === 2) {
            localStorage.setItem('token', JSON.stringify(true));
            setOptimisationTemplateData(optimisationTemplateDataBackup);
        } else {
            localStorage.setItem('token', JSON.stringify(false));
            getDecisions();
        }
        if ((data.moreInformations[2] && data.moreInformations[2] === 'true') || (localStorage.getItem('token') === "true")) {
            localStorage.setItem('premium', JSON.stringify(true));
        } else {
            localStorage.setItem('premium', JSON.stringify(false));
        }
    };

    const handleValidLogin = (data: any) => {
        setUserId(data.id);
        initUserSetup(data);
        navigate('/landingpage');
    };

    const handleSubmitSignIn = async (event: any) => {
        event.preventDefault();

        const encodedCredentials = btoa('tester:T&st');
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        });

        try {
            const response = await fetch(
                'https://api.scandela.fr/users/signin',
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        email: emailSignIn,
                        password: passwordSignIn,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('La connexion a échoué');
            }
            const data = await response.json();
            handleValidLogin(data);
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    const handleSubmitSignUp = async (event: any) => {
        if (passwordSignUp !== '' && passwordSignUp === passwordConfirmSignUp) {
            event.preventDefault();

            const encodedCredentials = btoa('tester:T&st');
            const headers = new Headers({
                'Content-Type': 'application/json',
                Authorization: `Basic ${encodedCredentials}`,
            });

            try {
                const response = await fetch(
                    'https://api.scandela.fr/users/create',
                    {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            town: {
                                id: '2dac2740-1d45-42d7-af5e-13b98cdf3af4',
                            },
                            email: emailSignUp,
                            username: usernameSignUp,
                            password: passwordSignUp,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("L'inscription a échoué");
                }

                const data = await response.json();
                handleValidLogin(data);
            } catch (error) {
                console.error("Erreur lors de l'inscription", error);
            }
        }
    };

    const getDecisions = async () => {
        const username = 'tester';
        const password = 'T&st';

        try {
            const response = await fetch(
                'https://api.scandela.fr/decisions?pageNumber=0',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                    },
                }
            );
            const data = await response.json();
            addItemToOptimisationTemplate(data);
        } catch (error) {
            console.log('ERROR GET DECISIONS = ' + error);
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
