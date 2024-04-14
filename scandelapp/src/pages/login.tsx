import LoginModule from '../components/LoginModule';

interface LoginProps {
    addItemToOptimisationTemplate: (data: any) => void;
}

/** Login page of the app */
const Login: React.FC<LoginProps> = ({ addItemToOptimisationTemplate }) => {
    return (
        <div
            id={'loginPage'}
            style={{ backgroundColor: '#444444', height: '100vh' }}
        >
            <LoginModule
                addItemToOptimisationTemplate={addItemToOptimisationTemplate}
            />
        </div>
    );
};

export default Login;
