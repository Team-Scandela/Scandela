import * as React from 'react';
import { LogoutButtonContainer } from './elements';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
    id: string;
    isDark: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ id, isDark }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div>
            <LogoutButtonContainer
                isDark={isDark}
                onClick={handleLogout}
            ></LogoutButtonContainer>
        </div>
    );
};

export default LogoutButton;
