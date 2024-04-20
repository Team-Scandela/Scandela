import { LogoutButtonContainer } from './elements';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
    isDark: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isDark }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/landingpage');
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
