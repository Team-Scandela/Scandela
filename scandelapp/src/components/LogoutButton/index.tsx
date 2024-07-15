import { TbHomeMove } from 'react-icons/tb';
import { NonPremiumLogoutButton } from './elements';
import { useNavigate } from 'react-router-dom';

/** Props of the LogoutButton component
 * @param {boolean} isDark - If the map is in dark mode or not
 */
interface LogoutButtonProps {
    id: string;
    isDark: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ id, isDark }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/homepage');
    };

    return (
        <div>
            <NonPremiumLogoutButton
                isDark={isDark}
                onClick={() => handleLogout()}
            >
                <TbHomeMove size={35} />
            </NonPremiumLogoutButton>
        </div>
    );
};

export default LogoutButton;
