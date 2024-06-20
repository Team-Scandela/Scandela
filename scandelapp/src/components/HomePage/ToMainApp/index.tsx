import { ToMainAppRectangle, ToMainAppContainer, ToMainAppButton, CloseButton, ToMainAppText, ToMainAppImage } from './elements';
import { useNavigate } from 'react-router-dom';
import scandelapp from '../../../assets/homepage/scandelapp.png';

interface ToMainAppProps {
    closeToMainApp: () => void;
}

const ToMainApp: React.FC<ToMainAppProps> = ( { closeToMainApp } ) => {
    const navigate = useNavigate();

    const handleToMainAppClick = () => {
        navigate('/scandela')
    };

    return (
        <ToMainAppContainer>
            <ToMainAppRectangle >
                <CloseButton onClick={closeToMainApp} />
                <ToMainAppText>Entrer dans Scandela, le logiciel web cartographique de visualisation et d'aide à la décision pour l'éclairage public des communes françaises.</ToMainAppText>
                <ToMainAppImage src={scandelapp} alt="Scandela" />
                <ToMainAppButton onClick={handleToMainAppClick}>Accéder à l'application</ToMainAppButton>
            </ToMainAppRectangle>
        </ToMainAppContainer>
    );
};

export default ToMainApp;