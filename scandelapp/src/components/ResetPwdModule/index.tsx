import {
    ResetPwdButton,
    ResetPwdContainer,
    ResetPwdForm,
    ResetPwdInput,
    ResetPwdLink,
    ResetPwdPage,
    ResetPwdTitle,
} from './elements';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../utils/userUtils';
import { useState } from 'react';

interface ResetPwdModuleProps {
    /** UUID of the user */
    uuid: string;
}

/** Reset password module of the app */
const ResetPwdModule: React.FC<ResetPwdModuleProps> = ({ uuid }) => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    const submitNewPassword = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        if (isPasswordValid) {
            await changePassword(uuid, newPassword);
            navigate('/');
        }
    };

    const isPasswordValid = () => {
        if (newPassword !== confirmNewPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return false;
        }
        if (newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return false;
        }
        if (!/[a-z]/.test(newPassword)) {
            setError('Le mot de passe doit contenir au moins une minuscule.');
            return false;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setError('Le mot de passe doit contenir au moins une majuscule.');
            return false;
        }
        if (!/[0-9]/.test(newPassword)) {
            setError('Le mot de passe doit contenir au moins un chiffre.');
            return false;
        }
        return true;
    };

    return (
        <ResetPwdPage>
            <ResetPwdContainer>
                <ResetPwdForm>
                    <ResetPwdTitle>Reset your password</ResetPwdTitle>
                    <ResetPwdInput
                        type="password"
                        placeholder="New password"
                        required
                        onChange={(e: any) => setNewPassword(e.target.value)}
                    />
                    <ResetPwdInput
                        type="password"
                        placeholder="Confirm new password"
                        required
                        onChange={(e: any) =>
                            setConfirmNewPassword(e.target.value)
                        }
                    />
                    <p>{error}</p>
                    <ResetPwdButton type="submit" onClick={submitNewPassword}>
                        Reset
                    </ResetPwdButton>
                    <ResetPwdLink to="/login" onClick={() => navigate('/')}>
                        Back to login
                    </ResetPwdLink>
                </ResetPwdForm>
            </ResetPwdContainer>
        </ResetPwdPage>
    );
};

export default ResetPwdModule;
