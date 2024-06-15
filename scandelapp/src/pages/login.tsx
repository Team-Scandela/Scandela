import LoginModule from '../components/LoginModule';

interface LoginProps {
    setOptimisationTemplateData: (data: any) => void;
    addItemToOptimisationTemplate: (data: any) => Promise<void>;
}

/** Login page of the app */
const Login: React.FC<LoginProps> = ({
    setOptimisationTemplateData,
    addItemToOptimisationTemplate,
}) => {
    return (
        <div
            id={'loginPage'}
            style={{ backgroundColor: '#444444', height: '100vh' }}
        >
            <LoginModule
                setOptimisationTemplateData={setOptimisationTemplateData}
                addItemToOptimisationTemplate={addItemToOptimisationTemplate}
            />
        </div>
    );
};

export default Login;
