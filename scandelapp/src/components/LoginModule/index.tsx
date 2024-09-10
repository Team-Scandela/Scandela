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
    ErrorMessage,
    OverlayContainer,
    Overlay,
    LeftOverlayPanel,
    RightOverlayPanel,
    Paragraph,
    GhostButton,
} from './elements';
import { useNavigate } from 'react-router-dom';
import {
    setUserId,
    getUser,
    putUser,
    getUserByMail,
} from '../../utils/userUtils';
import { getDecisions } from '../../utils/decisionsUtils';
import { signUp, signIn } from '../../utils/loginUtils';
import sendEmail from './emailsender';

interface LoginModuleProps {
    setOptimisationTemplateData: (data: any) => void;
    addItemToOptimisationTemplate: (data: any) => Promise<void>;
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
    const [forgotPassword, setForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const updateUser = async () => {
        const user = await getUser();
        localStorage.setItem('previousLastConnexion', user.lastConnexion);
        const updatedUserData = {
            town: user.town,
            email: user.email,
            username: user.username,
            password: user.password,
            rights: user.rights,
            moreInformations: user.moreInformations,
            darkmode: user.darkmode,
            lastConnexion: new Date().toISOString(),
            newsletter: user.newsletter,
            premium: user.premium,
        };
        putUser(updatedUserData);
    };

    const setUpDecisions = async () => {
        const data = await getDecisions();
        addItemToOptimisationTemplate(data);
    };

    const initUserSetup = async (data: any) => {
        if (!data) {
            console.error('data is null or undefined');
        }

        localStorage.setItem('isDark', JSON.stringify(data.darkmode));
        localStorage.setItem('vegetalScore', JSON.stringify(false));
        localStorage.setItem('consumptionScore', JSON.stringify(false));
        localStorage.setItem('lightScore', JSON.stringify(false));
        localStorage.setItem('tmpVegetalScore', JSON.stringify(false));
        localStorage.setItem('tmpConsumptionScore', JSON.stringify(false));
        localStorage.setItem('tmpLightScore', JSON.stringify(false));
        localStorage.setItem('lassoActive', JSON.stringify(false));
        //getAllScores();

        if (data.rights === 2) {
            localStorage.setItem('token', JSON.stringify(true));
            setUpDecisions();
            // localStorage.setItem('token', JSON.stringify(true));
            // setOptimisationTemplateData(optimisationTemplateDataBackup);
        } else {
            localStorage.setItem('token', JSON.stringify(false));
            setUpDecisions();
        }

        if (localStorage.getItem('token') === 'true' || data.premium) {
            localStorage.setItem('premium', JSON.stringify(true));
        } else {
            localStorage.setItem('premium', JSON.stringify(false));
        }
    };

    const handleValidLogin = (data: any) => {
        setUserId(data.id);
        initUserSetup(data);
        updateUser();
        navigate('/homepage');
        navigate('/loadingpage');
    };

    const handleSubmitSignIn = async (event: any) => {
        event.preventDefault();
        try {
            const response = await signIn(emailSignIn, passwordSignIn);
            handleValidLogin(response);
        } catch (error) {
            if (error) setError('Identifiants incorrects ou inexistants.');
        }
    };

    const handleSubmitSignUp = async (event: any) => {
        if (passwordSignUp !== '' && passwordSignUp === passwordConfirmSignUp) {
            event.preventDefault();

            const response = await signUp(
                emailSignUp,
                usernameSignUp,
                passwordSignUp
            );
            handleValidLogin(response);
        }
    };

    const getUserData = async () => {
        console.log('getUserData');
        const user = await getUserByMail(emailSignIn);
        console.log(user);
        return user;
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
                {!forgotPassword && (
                    <Form>
                        <Title>Sign In</Title>
                        <Input
                            type="text"
                            placeholder="Email"
                            value={emailSignIn}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmailSignIn(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={passwordSignIn}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPasswordSignIn(e.target.value)}
                        />
                        <Anchor
                            onClick={() => {
                                setForgotPassword(true);
                            }}
                        >
                            Forgot your password?
                        </Anchor>
                        <Button onClick={handleSubmitSignIn}> Sign In </Button>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </Form>
                )}
                {forgotPassword && (
                    <Form>
                        <Title>Forgot your password?</Title>
                        <Paragraph>
                            Enter your email and we will send you a link to
                            reset your password.
                        </Paragraph>
                        <Input
                            type="text"
                            placeholder="Email"
                            value={forgotPasswordEmail}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setForgotPasswordEmail(e.target.value)}
                        />
                        <Button
                            onClick={() => {
                                const userData: any = getUserData();
                                if (userData === null) {
                                    return;
                                }
                                // get the result of the promise userData
                                const result = userData.then((value: any) => {
                                    console.log('value');
                                    console.log(value);
                                    setForgotPassword(false);
                                    sendEmail(
                                        value.username,
                                        forgotPasswordEmail,
                                        value.id
                                    );
                                    alert(
                                        'An email has been sent to ' +
                                            forgotPasswordEmail +
                                            ' to reset your password.'
                                    );
                                });
                            }}
                        >
                            {' '}
                            Send{' '}
                        </Button>
                    </Form>
                )}
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
                            Enter Your personal details and connect to Scandela
                        </Paragraph>
                        <GhostButton
                            onClick={() => {
                                setSignInPage(false);
                                setForgotPassword(false);
                            }}
                        >
                            Sign In
                        </GhostButton>
                    </RightOverlayPanel>
                </Overlay>
            </OverlayContainer>
        </LoginContainer>
    );
};

export default LoginModule;
