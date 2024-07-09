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

    const submitNewPassword = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match');
            return;
        }

        await changePassword(uuid, newPassword);
        navigate('/');
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
