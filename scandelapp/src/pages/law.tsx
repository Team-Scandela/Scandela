import { useState } from 'react';
import {
    StyledLawsPageContainer,
    Title,
    Description,
    CardContainer,
    LawCard,
    ModalOverlay,
    ModalButtonSection,
    StyledModalContent,
    ModalCloseButton,
    ModalLinkButton,
    ScrollableContainer,
    SectionContent,
    ResourcesSection,
    SectionTitle,
} from '../components/Law/elements';
import { lawData } from '../components/Law/data/lawData';
import { Grey, DarkGrey, Yellow, DarkYellow, Black } from '../colors';

import Graph1 from '../assets/law/impact.png';
import Graph2 from '../assets/law/mesure-optiques.png';
import Graph3 from '../assets/law/placement.png';
import { White } from '../colors';

const LawIndicator = () => {
    const [selectedLaw, setSelectedLaw] = useState(null);

    interface Law {
        name: string;
        description: string;
        impacts: string[];
        details: string;
    }

    const openModal = (law: Law) => {
        setSelectedLaw(law);
    };

    const closeModal = () => {
        setSelectedLaw(null);
    };

    const ColoredLine = ({ color }: { color: string }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2,
                width: '90%',
                border: 'none',
                margin: '0 auto',
            }}
        />
    );

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    const openModal1 = () => {
        setShowModal1(true);
    };

    const closeModal1 = () => {
        setShowModal1(false);
    };

    const openModal2 = () => {
        setShowModal2(true);
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };

    const openModal3 = () => {
        setShowModal3(true);
    };

    const closeModal3 = () => {
        setShowModal3(false);
    };

    return (
        <StyledLawsPageContainer>
            <ScrollableContainer>
                <Title>Information sur les règlementations</Title>
                <Description>
                    Visualisez les lois et réglementations en vigueur et leurs
                    impacts sur les indicateurs de performance de l'éclairage
                    urbain. Cette section vous permettra de mieux comprendre les
                    exigences légales ainsi que les mesures à prendre pour
                    assurer la conformité et l'efficacité de l'éclairage public.
                </Description>
                <ColoredLine color={Yellow} />
                <CardContainer>
                    {lawData.map((law, index) => (
                        <LawCard key={index} onClick={() => openModal(law)}>
                            <h2>{law.name}</h2>
                            <p>{law.description}</p>
                        </LawCard>
                    ))}
                </CardContainer>
                {selectedLaw && (
                    <ModalOverlay>
                        <StyledModalContent>
                            <h2>{selectedLaw.name}</h2>
                            <p>{selectedLaw.details}</p>
                            <br />
                            <h3>Impacts :</h3>
                            <ul>
                                {selectedLaw.impacts.map(
                                    (impact: string, idx: number) => (
                                        <li key={idx}>{impact}</li>
                                    )
                                )}
                            </ul>
                            <ModalButtonSection>
                                <ModalCloseButton onClick={closeModal}>
                                    Fermer
                                </ModalCloseButton>
                                <ModalLinkButton
                                    href={selectedLaw.url}
                                    target="_blank"
                                >
                                    En savoir plus
                                </ModalLinkButton>
                            </ModalButtonSection>
                        </StyledModalContent>
                    </ModalOverlay>
                )}
                <ResourcesSection>
                    <SectionTitle>
                        Ressources et Documents Téléchargeables
                    </SectionTitle>
                    <SectionContent>
                        <p>
                            <a
                                href={require('../components/Law/data/law.pdf')}
                                download="myFile"
                            >
                                Télécharger la version PDF
                            </a>
                        </p>
                        <br />
                        <button
                            style={{
                                backgroundColor: DarkGrey,
                                color: Grey,
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                marginRight: '10px',
                            }}
                            onClick={openModal1}
                        >
                            Rendu des couleurs
                        </button>
                        {showModal1 && (
                            <ModalOverlay>
                                <StyledModalContent>
                                    <h2>Rendu des couleurs</h2>
                                    <p>
                                        Les différents types de sources
                                        lumineuses ne restituent pas toutes les
                                        couleurs de la même manière.
                                        <br />
                                        <br />
                                        Lorsque l’enjeu de rendu des couleurs
                                        est important pour un projet, des
                                        sources lumineuses comme des lampes à
                                        iodures métalliques ou des LED dont
                                        l’indice de rendu des couleurs (IRC ou
                                        Ra) est élevé sont à privilégier.{' '}
                                    </p>
                                    <img
                                        src={Graph1}
                                        alt="Graphique 1"
                                        style={{
                                            width: '100%',
                                            height: '250px',
                                            marginBottom: '20px',
                                        }}
                                    />
                                    <ModalCloseButton onClick={closeModal1}>
                                        Fermer
                                    </ModalCloseButton>
                                </StyledModalContent>
                            </ModalOverlay>
                        )}
                        <button
                            style={{
                                backgroundColor: DarkGrey,
                                color: Yellow,
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                marginRight: '10px',
                            }}
                            onClick={openModal2}
                        >
                            Distribution de la lumière
                        </button>
                        {showModal2 && (
                            <ModalOverlay>
                                <StyledModalContent>
                                    <h2>Distribution de la lumière</h2>
                                    <p>
                                        Plusieurs systèmes (manières de
                                        représenter) cohabitent. Ici, le système
                                        « C, γ » (C, gamma) sera retenu.
                                        <br />
                                        <br />
                                        Dans celui-ci, chaque plan est dénommé «
                                        Plan C ». Un plan peut être assimilé aux
                                        pages d’un livre ouvert. Pour chaque
                                        plan, on cherche à savoir comment la
                                        lumière est émise : dans quelle
                                        direction (angle Gamma) et avec quelle
                                        intensité.
                                        <br />
                                        <br />
                                        Le diagramme représente quatre plans
                                        (soit quatre directions) : C0-C180,
                                        C90-C270.
                                        <br />
                                        <br />
                                        On pourrait alors les synthétiser comme
                                        étant les représentations de la
                                        distribution de la lumière vers la
                                        droite, la gauche, l’avant et l’arrière.
                                        Le luminaire étant posé à plat et sans
                                        orientation.
                                    </p>
                                    <img
                                        src={Graph2}
                                        alt="Graphique 2"
                                        style={{
                                            width: '80%',
                                            height: 'auto',
                                            marginBottom: '20px',
                                        }}
                                    />
                                    <ModalCloseButton onClick={closeModal2}>
                                        Fermer
                                    </ModalCloseButton>
                                </StyledModalContent>
                            </ModalOverlay>
                        )}
                        <button
                            style={{
                                backgroundColor: DarkGrey,
                                color: Grey,
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                            }}
                            onClick={openModal3}
                        >
                            Comment un lampadaire éclaire
                        </button>
                        {showModal3 && (
                            <ModalOverlay>
                                <StyledModalContent>
                                    <h2>Comment un lampadaire éclaire</h2>
                                    <p>
                                        Dessin en coupe combinaison lettre et
                                        rapport W largeur, H hauteur
                                    </p>
                                    <img
                                        src={Graph3}
                                        alt="Graphique 3"
                                        style={{
                                            width: '80%',
                                            height: 'auto',
                                            marginBottom: '20px',
                                        }}
                                    />
                                    <ModalCloseButton onClick={closeModal3}>
                                        Fermer
                                    </ModalCloseButton>
                                </StyledModalContent>
                            </ModalOverlay>
                        )}
                    </SectionContent>
                </ResourcesSection>
            </ScrollableContainer>
        </StyledLawsPageContainer>
    );
};

export default LawIndicator;
