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

    const [ConsumptionScore, setConsumptionScore] = useState(0);
    const [LightScore, setLightScore] = useState(0);
    const [VegetalScore, setVegetalScore] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const ttmpConsumptionScore = localStorage.getItem(
                'tmpConsumptionScore'
            );
            const ttmpLightScore = localStorage.getItem('tmpLightScore');
            const ttmpVegetalScore = localStorage.getItem('tmpVegetalScore');

            const tConsumptionScore = localStorage.getItem('consumptionScore');
            const tLightScore = localStorage.getItem('lightScore');
            const tVegetalScore = localStorage.getItem('vegetalScore');

            if (isLoaded) {
                if (tConsumptionScore != 'false') {
                    setConsumptionScore(parseFloat(tConsumptionScore));
                }
                if (tLightScore != 'false') {
                    setLightScore(parseFloat(tLightScore));
                }
                if (tVegetalScore != 'false') {
                    setVegetalScore(parseFloat(tVegetalScore));
                }
            }

            if (ttmpConsumptionScore != 'false') {
                setTmpConsumptionScore(parseFloat(ttmpConsumptionScore));
                clearInterval(interval);
                setIsLoaded(true);
            }
            if (ttmpLightScore != 'false') {
                setTmpLightScore(parseFloat(ttmpLightScore));
                clearInterval(interval);
            }
            if (ttmpVegetalScore != 'false') {
                setTmpVegetalScore(parseFloat(ttmpVegetalScore));
                clearInterval(interval);
            }
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
                                        {tmpConsumptionScore.toFixed(2)}%
                                        <br />
                                        <br />
                                        Végétal : {tmpVegetalScore.toFixed(2)}%
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
                                        Lumière : {tmpLightScore.toFixed(2)} %
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
                                oldLevel={ConsumptionScore}
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
                                oldLevel={VegetalScore}
                                top={45}
                                left={82}
                            />
                            <PersonnalizedGauge
                                id={'LumiGaugesComponentId'}
                                isDark={isDark}
                                isElec={false}
                                isBio={false}
                                isLumi={true}
                                level={tmpLightScore}
                                oldLevel={LightScore}
                                top={70}
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
