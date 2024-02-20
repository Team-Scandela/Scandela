import LoginModule from '../components/LoginModule';

interface LoginProps {
    updateUserInfo: (newInfo: any) => void;
}

/** Login page of the app */
const Login: React.FC<LoginProps> = ({ updateUserInfo }) => {
    return (
        <div
            id={'loginPage'}
            style={{ backgroundColor: '#444444', height: '100vh' }}
        >
            <LoginModule 
                updateUserInfo={updateUserInfo}
            />
        </div>
    );
};

export default Login;
