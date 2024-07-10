import styled from 'styled-components';
import { Yellow, Black, White, DarkGrey, DarkYellow} from '../../../../colors';

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // Fond légèrement grisé transparent
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const ModalContent = styled.div`
    background-color: ${Black}; // Fond noir pour le contenu modal
    padding: 20px;
    border-radius: 5px;
    color: ${White}; // Texte en blanc
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:nth-child(1) {
        background-color: ${Yellow}; // Bouton Annuler en jaune
        color: ${Black}; // Texte en noir

        &:hover {
            background-color: ${White}; // Changement de couleur au survol en blanc
            color: ${Black}; // Texte en noir
        }
    }

    button:nth-child(2) {
        background-color: ${Yellow}; // Bouton Confirmer en jaune
        color: ${Black}; // Texte en noir

        &:hover {
            background-color: ${White}; // Changement de couleur au survol en blanc
            color: ${Black}; // Texte en noir
        }
    }
`;
