import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TutorielBackground } from './elements';

interface TutorielProps {
    id: string;
    isDark: boolean;
    setShowTutoriel: (value: boolean) => void;
    setDecisionPanelExtended: (value: boolean) => void;
}

const Tutoriel: React.FC<TutorielProps> = ({
    id,
    isDark,
    setShowTutoriel,
    setDecisionPanelExtended,
}) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setDecisionPanelExtended(false);
    }, []);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
        if (currentStep === 5)
          setShowTutoriel(false);
    };

    return (
        <div>
            <TutorielBackground onClick={() => handleNextStep()}/>
        </div>
    );
};

export default Tutoriel;
