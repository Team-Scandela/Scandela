import { useState, useEffect } from 'react';
import {
    LassoButton,
    ValidateButton,
    Modal,
    CloseButton,
    ModalHeader,
    ModalContent,
} from './elements';
import { TbLassoPolygon } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa';
import { PersonnalizedGauge } from '../Gauges';

interface LassoButtonProps {
    id: string;
    isDark: boolean;
    onLassoActivation: (isActive: boolean) => void;
    onLassoValidation: () => void;
}

const Lasso: React.FC<LassoButtonProps> = ({
    id,
    isDark,
    onLassoActivation,
    onLassoValidation,
}) => {
    const [isOn, setIsOn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tmpConsumptionScore, setTmpConsumptionScore] = useState(0);
    const [tmpLightScore, setTmpLightScore] = useState(0);
    const [tmpVegetalScore, setTmpVegetalScore] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const tmpConsumptionScore = localStorage.getItem(
                'tmpConsumptionScore'
            );
            const tmpLightScore = localStorage.getItem('tmpLightScore');
            const tmpVegetalScore = localStorage.getItem('tmpVegetalScore');

            if (tmpConsumptionScore != 'false') {
                setTmpConsumptionScore(parseFloat(tmpConsumptionScore));
                clearInterval(interval);
                setIsLoaded(true);
            }
            if (tmpLightScore != 'false') {
                setTmpLightScore(parseFloat(tmpLightScore));
                clearInterval(interval);
            }
            if (tmpVegetalScore != 'false') {
                setTmpVegetalScore(parseFloat(tmpVegetalScore));
                clearInterval(interval);
            }
            console.log('a');
        }, 1000);
    });

    const toggleLassoActivation = () => {
        const isActive = !isOn;
        setIsOn(isActive);
        onLassoActivation(isActive);
    };

    const toggleLassoValidation = () => {
        onLassoValidation();
        setIsModalOpen(true);
    };

    const toggleCloseModal = () => {
        setIsModalOpen(false);
        setIsLoaded(false);

        localStorage.setItem('tmpConsumptionScore', 'false');
        localStorage.setItem('tmpLightScore', 'false');
        localStorage.setItem('tmpVegetalScore', 'false');
        setTmpConsumptionScore(0);
        setTmpLightScore(0);
        setTmpVegetalScore(0);
    };

    return (
        <div id={id}>
            <LassoButton
                onClick={toggleLassoActivation}
                isDark={isDark}
                isOn={isOn}
            >
                <TbLassoPolygon size={30} />
            </LassoButton>
            {isOn && (
                <>
                    <ValidateButton
                        isDark={isDark}
                        onClick={toggleLassoValidation}
                    >
                        <FaCheck size={30} />
                    </ValidateButton>
                    {isModalOpen && (
                        <Modal isOpen={isModalOpen} isDark={isDark}>
                            <CloseButton
                                onClick={toggleCloseModal}
                                isDark={isDark}
                            >
                                X
                            </CloseButton>
                            <ModalHeader isDark={isDark}>
                                Voici les résultats de votre lasso !!
                            </ModalHeader>
                            <ModalContent isDark={isDark}>
                                {isLoaded && (
                                    <>
                                        Félicitations, vous avez terminé votre
                                        lasso. Voici vos résultats :
                                        <br />
                                        <br />
                                        <br />
                                        Consommation :{' '}
                                        {tmpConsumptionScore.toFixed(2)} / 100
                                        <br />
                                        <br />
                                        Végétal : {tmpVegetalScore.toFixed(2)} /
                                        100
                                        {tmpVegetalScore == 0 && isLoaded && (
                                            <>
                                                <br />
                                                <br />
                                                Vous n'avez pas sélectionné de
                                                zone végétale. Votre score n'est
                                                donc pas pris en compte.
                                            </>
                                        )}
                                        <br />
                                        <br />
                                        Lumière : {tmpLightScore.toFixed(2)} /
                                        100
                                    </>
                                )}
                                {!isLoaded && (
                                    <p>
                                        Veuillez patienter, nous calculons vos
                                        résultats...
                                    </p>
                                )}
                            </ModalContent>
                            <PersonnalizedGauge
                                id={'ElecGaugesComponentId'}
                                isDark={isDark}
                                isElec={true}
                                isBio={false}
                                isLumi={false}
                                level={tmpConsumptionScore}
                                oldLevel={tmpConsumptionScore}
                                top={20}
                                left={82}
                            />
                            <PersonnalizedGauge
                                id={'BioGaugesComponentId'}
                                isDark={isDark}
                                isElec={false}
                                isBio={true}
                                isLumi={false}
                                level={tmpVegetalScore}
                                oldLevel={tmpVegetalScore}
                                top={40}
                                left={82}
                            />
                            <PersonnalizedGauge
                                id={'LumiGaugesComponentId'}
                                isDark={isDark}
                                isElec={false}
                                isBio={false}
                                isLumi={true}
                                level={tmpLightScore}
                                oldLevel={tmpLightScore}
                                top={60}
                                left={82}
                            />
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
};

export default Lasso;
