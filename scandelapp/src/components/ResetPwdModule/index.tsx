import { ResetPwdButton, ResetPwdContainer, ResetPwdForm, ResetPwdInput, ResetPwdLink, ResetPwdPage, ResetPwdTitle } from "./elements";
import { useNavigate } from 'react-router-dom';

interface ResetPwdModuleProps {
}

/** Reset password module of the app */
const ResetPwdModule: React.FC<ResetPwdModuleProps> = () => {
    const navigate = useNavigate();
    return (
        <ResetPwdPage>
            <ResetPwdContainer>
                <ResetPwdForm>
                    <ResetPwdTitle>Reset your password</ResetPwdTitle>
                    <ResetPwdInput type="password" placeholder="New password" required />
                    <ResetPwdInput type="password" placeholder="Confirm new password" required />
                    <ResetPwdButton type="submit">Reset</ResetPwdButton>
                    <ResetPwdLink to="/login" onClick={() => navigate('/')}>Back to login</ResetPwdLink>
                </ResetPwdForm>
            </ResetPwdContainer>
        </ResetPwdPage>
    );
};

export default ResetPwdModule;