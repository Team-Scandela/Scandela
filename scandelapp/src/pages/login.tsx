import LoginModule from '../components/LoginModule';

/**
 * Props for the Login component.
 * @interface LoginProps
 */
interface LoginProps {
    /** Function to set optimisation template data. */
    setOptimisationTemplateData: (data: any) => void;
    /** Function to add an item to the optimisation template. */
    addItemToOptimisationTemplate: (data: any) => Promise<void>;
}

/**
 * Login page component of the application.
 * 
 * @component
 * @param {LoginProps} props - Props for Login component.
 * @returns {JSX.Element} The Login component.
 */
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
