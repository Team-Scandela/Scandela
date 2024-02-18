import LoginModule from '../components/LoginModule';

/** Login page of the app */
const Login: React.FC = () => {
    return (
        <div
            id={'loginPage'}
            style={{ backgroundColor: '#444444', height: '100vh' }}
        >
            <LoginModule />
        </div>
    );
};

export default Login;
