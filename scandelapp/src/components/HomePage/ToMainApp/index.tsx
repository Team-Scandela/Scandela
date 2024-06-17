import { ToMainAppRectangle, ToMainAppContainer, ToMainAppButton, CloseButton } from './elements';
import { useNavigate } from 'react-router-dom';

interface ToMainAppProps {
}

const ToMainApp: React.FC<ToMainAppProps> = () => {
    const navigate = useNavigate();

    const handleToMainAppClick = () => {
        navigate('/scandela')
    };

    return (
        <ToMainAppContainer>
            <ToMainAppRectangle >
                <CloseButton />
            </ToMainAppRectangle>
            <ToMainAppButton onClick={handleToMainAppClick}>Accéder à l'application</ToMainAppButton>
        </ToMainAppContainer>
    );
};

export default ToMainApp;