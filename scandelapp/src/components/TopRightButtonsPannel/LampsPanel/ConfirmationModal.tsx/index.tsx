import React from 'react';
import {
    ModalBackdrop,
    ModalContent,
    ButtonGroup
} from './elements';

interface ConfirmationModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onCancel,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <ModalBackdrop>
            <ModalContent>
                <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                <ButtonGroup>
                    <button onClick={onCancel}>Annuler</button>
                    <button onClick={onConfirm}>Confirmer</button>
                </ButtonGroup>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default ConfirmationModal;
