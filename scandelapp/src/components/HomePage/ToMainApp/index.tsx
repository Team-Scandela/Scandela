import { ToMainAppRectangle, ToMainAppContainer, ToMainAppButton, CloseButton, ToMainAppText, ToMainAppImage, ToMainAppPart, ToMainAppTitle } from './elements';
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

    const text = "Entrer dans Scandela, le logiciel web cartographique de visualisation et d'aide à la décision pour l'éclairage public des communes françaises. <br/> A travers votre dashboard personnalisé, vous pourrez visualiser et analyser les données de votre territoire, et ainsi prendre des décisions éclairées pour l'avenir de votre éclairage public.";

    return (
        <ToMainAppContainer>
            <ToMainAppRectangle >
                <ToMainAppTitle>Dashboard</ToMainAppTitle>
                <CloseButton onClick={closeToMainApp} />
                <ToMainAppPart left={"2.5%"} width = {"55%"}>
                    <ToMainAppImage src={scandelapp} alt="Scandela" />
                </ToMainAppPart>
                <ToMainAppPart left={"60%"} width = {"37.5%"}>
                    <ToMainAppText dangerouslySetInnerHTML={{ __html: text }} />
                    <ToMainAppButton onClick={handleToMainAppClick}>Accéder au dashboard</ToMainAppButton>
                </ToMainAppPart>
            </ToMainAppRectangle>
        </ToMainAppContainer>
    );
};

export default ToMainApp;