import React, { useState, useEffect } from 'react';
import {
    OptimisationTemplateContainer,
    SelectionIndicator,
    TextContainer,
    TypeText,
    LocationText,
    DescriptionText,
    SolutionTextContainer,
    SolutionText,
    PriceText,
    DeleteButton
} from './elements';

import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../ConfirmationModal.tsx'; // Importez la modal de confirmation

interface OptimisationTemplateProps {
    isDark: boolean;
    y: number;
    optimisationTemplateData: {
        id: number;
        name: string;
        location: string;
        selected: boolean;
        price?: number;
        bulbType: string;
        intensity: number;
        consumption: number;
    };
    onTemplateClick: (isChecked: boolean) => void;
    price: number;
    onItemDelete: () => void;
}

const LampsTemplate: React.FC<OptimisationTemplateProps> = ({
    isDark,
    y,
    optimisationTemplateData,
    onTemplateClick,
    price,
    onItemDelete
}) => {
    const { t } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // État pour ouvrir/fermer la modal de confirmation

    useEffect(() => {
        setIsChecked(optimisationTemplateData.selected);
    }, [optimisationTemplateData.selected]);

    const handleTemplateClick = () => {
        const newCheckedValue = !isChecked;
        setIsChecked(newCheckedValue);
        onTemplateClick(newCheckedValue);
    };

    const handleDeleteClick = () => {
        setIsConfirmModalOpen(true); // Ouvre la modal de confirmation
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false); // Ferme la modal de confirmation
    };

    const handleConfirmDelete = () => {
        onItemDelete(); // Appelle la fonction de suppression
        setIsConfirmModalOpen(false); // Ferme la modal de confirmation après la suppression
    };

    return (
        <OptimisationTemplateContainer
            isDark={isDark}
            y={y}
            onClick={() => handleTemplateClick()}
        >
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />      
            <SelectionIndicator
                isDark={isDark}
                checked={isChecked}
            />
            <TextContainer>
                <TypeText isDark={isDark}>
                    {optimisationTemplateData.name}
                </TypeText>
                <LocationText isDark={isDark}>
                    {optimisationTemplateData.location}
                </LocationText>
                {/* <DescriptionText isDark={isDark}>
                    {optimisationTemplateData.description}
                </DescriptionText> */}
                <PriceText isDark={isDark}>
                    {price}
                </PriceText>
            </TextContainer>
            <SolutionTextContainer isDark={isDark}>
                <SolutionText isDark={isDark}>
                    Type : {optimisationTemplateData.bulbType}<br />
                    Intensité : {optimisationTemplateData.intensity} Ix <br />
                    Consommation : {optimisationTemplateData.consumption} W
                </SolutionText>
            </SolutionTextContainer>
            <DeleteButton onClick={handleDeleteClick} />
        </OptimisationTemplateContainer>
    );
};

export default LampsTemplate;
