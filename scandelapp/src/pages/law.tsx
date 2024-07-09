// pages/laws.tsx
import React from 'react';
import {
    LawsPageContainer,
    Title,
    Description,
    CardContainer,
    LawCard,
    LawSection,
    SectionTitle,
    SectionContent,
    ImpactList,
    FAQSection,
    CaseStudySection,
    ResourcesSection,
    TestimonialSection,
    NewsSection,
    ScrollableContainer,
} from '../components/Law/elements';

const sources = [
    { title: 'Association Française de l\'Éclairage', url: 'https://www.afe-eclairage.fr/' },
    { title: 'BOAMP', url: 'https://www.boamp.fr/pages/entreprise-accueil/' },
    { title: 'Ministère de la Transition écologique', url: 'https://www.ecologie.gouv.fr/' },
    { title: 'ADEME', url: 'https://www.ademe.fr/' },
    { title: 'CIE', url: 'https://cie.co.at/' },
    { title: 'ISO', url: 'https://www.iso.org/home.html' },
    { title: 'Ministère de la Justice', url: 'https://www.justice.gouv.fr/justice-france/lorganisation-cours-tribunaux/lordre-judiciaire/cour-cassation' },
    { title: 'Pollution lumineuse', url: 'https://www.ecologie.gouv.fr/pollution-lumineuse' },
    { title: 'Service Public - Entreprendre', url: 'https://entreprendre.service-public.fr/vosdroits/F24396' },
    { title: 'Cahier d\'accompagnement Axe1 Éclairage', url: 'https://www.ecologie.gouv.fr/sites/default/files/Cahier accompagnement_Axe1_Eclairage.pdf' },
    { title: 'Financement Travaux Collectivité', url: 'https://www.sieds.fr/financement-travaux-collectivite/eclairage-public/' },
    { title: 'Trame noire', url: 'https://www.ofb.gouv.fr/trame-verte-et-bleue/trame-noire' },
    { title: 'Legifrance - Décret', url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037864346' },
    { title: 'Arrêté du 27 décembre 2018', url: 'https://www.ecologie.gouv.fr/arrete-du-27-decembre-2018-relatif-prevention-reduction-et-limitation-des-nuisances-lumineuses' },
    { title: 'Charte Éclairage Public 2013', url: 'https://www.sde35.fr/sites/default/files/2020-04/Charte_Eclairage_Public_2013.pdf' },
    { title: 'Legifrance', url: 'https://www.legifrance.gouv.fr/' },
];

const laws = [
    {
        name: 'Décret n°2018-1186 du 19 décembre 2018',
        description: 'Relatif à la prévention, à la réduction et à la limitation des nuisances lumineuses.',
        requirements: 'Réduction des émissions de lumière bleue, limitation de l’éclairage public durant certaines heures.',
        impact: 'Réduction de la pollution lumineuse, économie d’énergie.',
        implementationDate: '27 décembre 2018',
    },
    {
        name: 'Décret n°2018-1186 du 19 décembre 2018',
        description: 'Relatif à la prévention, à la réduction et à la limitation des nuisances lumineuses.',
        requirements: 'Réduction des émissions de lumière bleue, limitation de l’éclairage public durant certaines heures.',
        impact: 'Réduction de la pollution lumineuse, économie d’énergie.',
        implementationDate: '27 décembre 2018',
    },
    {
        name: 'Décret n°2018-1186 du 19 décembre 2018',
        description: 'Relatif à la prévention, à la réduction et à la limitation des nuisances lumineuses.',
        requirements: 'Réduction des émissions de lumière bleue, limitation de l’éclairage public durant certaines heures.',
        impact: 'Réduction de la pollution lumineuse, économie d’énergie.',
        implementationDate: '27 décembre 2018',
    },
    // Ajoutez d'autres lois ici...
];

const Laws: React.FC = () => {
    return (
        <LawsPageContainer>
            <ScrollableContainer>
                <Title>Indicateur Lois</Title>
                <Description>
                    Cette page répertorie les lois et réglementations relatives à l'éclairage urbain ainsi que leurs impacts sur les statistiques et paramètres de l'éclairage urbain.
                    Vous pouvez cliquer sur les cartes ci-dessous pour accéder aux sources des lois.
                </Description>
                <CardContainer>
                    {sources.map((source, index) => (
                        <LawCard key={index} href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.title}
                        </LawCard>
                    ))}
                </CardContainer>
                <div>
                    {laws.map((law, index) => (
                        <LawSection key={index}>
                            <SectionTitle>{law.name}</SectionTitle>
                            <SectionContent>{law.description}</SectionContent>
                            <SectionContent><strong>Exigences :</strong> {law.requirements}</SectionContent>
                            <SectionContent><strong>Impact :</strong> {law.impact}</SectionContent>
                            <SectionContent><strong>Date de mise en place :</strong> {law.implementationDate}</SectionContent>
                        </LawSection>
                    ))}
                </div>
                <ResourcesSection>
                    <SectionTitle>Ressources et Documents Téléchargeables</SectionTitle>
                    <SectionContent>
                        <p><a href="lien-vers-un-document.pdf" target="_blank" rel="noopener noreferrer">Télécharger le guide pratique (PDF)</a></p>
                        {/* Ajoutez plus de ressources ici */}
                    </SectionContent>
                </ResourcesSection>
                <NewsSection>
                    <SectionTitle>Actualités et Mises à Jour</SectionTitle>
                    <SectionContent>
                        <p>Dernières nouvelles sur les réglementations.</p>
                        {/* Ajoutez plus d'actualités ici */}
                    </SectionContent>
                </NewsSection>
            </ScrollableContainer>
        </LawsPageContainer>
    );
};

export default Laws;
