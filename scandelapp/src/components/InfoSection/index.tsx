import React from 'react';
import { InfoSectionContainer, InfoParagraph } from './elements';

const InfoSection = () => {
    return (
        <InfoSectionContainer>
            <InfoParagraph>
                Vous trouverez ici des statistiques et des classements détaillés
                sur les performances de votre ville en matière d'éclairage.
                Cette section comprend des données sur l'efficacité énergétique,
                l'impact environnemental, les coûts de maintenance et la qualité
                de l'éclairage. Utilisez les filtres pour consulter les données
                sur différentes périodes et comparez les performances de votre
                ville avec celles d'autres villes.
            </InfoParagraph>
        </InfoSectionContainer>
    );
};

export default InfoSection;
