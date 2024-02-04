import { useState } from 'react';
import {
    FAQPageContainer,
    FAQLeftContainer,
    FAQRightContainer,
    QuestionTemplateContainer,
    TitleText,
    DescriptionTitleText,
    DescriptionText,
    ReturnButtonContainer,
} from './elements';

/** FAQ page component
 * @param {function} handleFAQButtonClicked - Function to show/hide premium page
 */

interface FAQPagePros {
    handleFAQButtonClicked: () => void;
}

const FAQPage: React.FC<FAQPagePros> = ({ handleFAQButtonClicked }) => {
    const [faqData, setFaqData] = useState([
        {
            id: 1,
            title: "Qu'est-ce que Scandela ?",
            description:
                "Scandela est un logiciel web cartographique d’aide à la décision pour l’éclairage public des communes françaises. Notre but est d’aider les collectivités locales à prendre les bonnes décisions au bon moment pour gérer leur lampadaire et autres lumières. Nous avons pour objectif de diminuer les dépenses énergétiques et environnementales qui sont liés à l’éclairage public tout en assurant la sécurité des usagers sur les routes. Notre solution permettra de définir quel rue/quartier a besoin d'être allumé de telle à telle heure grâce à  de multiples paramètres. Ces paramètres peuvent être liés à la sécurité, à la biodiversité, au trafic ... Notre projet web se présentera via un tableau de bord et plusieurs cartographies montrant différentes informations qui permettront aux acteurs concernés de prendre les bonnes décisions.",
        },
        {
            id: 2,
            title: 'Pourquoi utiliser la version premium de Scandela et quels sont ses avantages ?',
            description: '',
        },
        {
            id: 3,
            title: "Quels sont les avantages d'utiliser Scandela dans ma commune ?",
            description: '',
        },
        {
            id: 4,
            title: "Comment Scandela collecte-t-elle les données sur l'éclairage public ?",
            description: '',
        },
        {
            id: 5,
            title: "Quels types de conseils d'optimisation sont disponibles dans Scandela ?",
            description: '',
        },
        {
            id: 6,
            title: 'Est-ce que Scandela propose des recommandations spécifiques en fonction des caractéristiques de ma commune ?',
            description: '',
        },
        {
            id: 7,
            title: 'Comment puis-je interpréter les optimisations fournies par Scandela ?',
            description: '',
        },
        {
            id: 8,
            title: 'Est-ce que Scandela prend en compte des critères environnementaux dans ses recommandations ?',
            description: '',
        },
        {
            id: 9,
            title: "Quelle est la fréquence de mise à jour des conseils d'optimisation ?",
            description: '',
        },
        {
            id: 10,
            title: 'Est-ce que Scandela offre un support en cas de problème ou de question ?',
            description: '',
        },
        {
            id: 11,
            title: "Est-ce que Scandela propose des solutions pour la transition vers des sources d'éclairage plus durables ?",
            description: '',
        },
        {
            id: 12,
            title: 'Quels sont les prérequis techniques pour utiliser Scandela ?',
            description: '',
        },
        {
            id: 13,
            title: "Scandela propose-t-elle des fonctionnalités de suivi et de rapport pour évaluer l'impact des optimisations ?",
            description: '',
        },
        {
            id: 14,
            title: "Y a-t-il des coûts associés à l'utilisation de Scandela ?",
            description: '',
        },
        {
            id: 15,
            title: 'Comment la vie privée des données des utilisateurs est-elle protégée ?',
            description: '',
        },
        {
            id: 16,
            title: "Est-ce que Scandela est compatible avec d'autres systèmes de gestion de l'éclairage existants ?",
            description: '',
        },
        {
            id: 17,
            title: "Comment puis-je partager les résultats et les recommandations de Scandela avec d'autres parties prenantes de la commune ?",
            description: '',
        },
    ]);
    const [currentSelected, setCurrentSelected] = useState(1);

    const handleReturnButtonClicked = () => {
        handleFAQButtonClicked();
    };

    const handleTitleClick = (id: number) => {
        setCurrentSelected(id);
    };

    return (
        <div>
            <FAQPageContainer>
                <FAQLeftContainer>
                    {faqData.map((item: any, i: number) => (
                        <QuestionTemplateContainer
                            key={i}
                            y={70 * i}
                            onClick={() => handleTitleClick(item.id)}
                        >
                            <TitleText>{item.title}</TitleText>
                        </QuestionTemplateContainer>
                    ))}
                </FAQLeftContainer>
                <FAQRightContainer>
                    <DescriptionTitleText>
                        {
                            faqData.find((item) => item.id === currentSelected)
                                .title
                        }
                    </DescriptionTitleText>
                    <DescriptionText>
                        {
                            faqData.find((item) => item.id === currentSelected)
                                .description
                        }
                    </DescriptionText>
                </FAQRightContainer>
            </FAQPageContainer>
            <ReturnButtonContainer onClick={handleReturnButtonClicked}>
                Return
            </ReturnButtonContainer>
        </div>
    );
};

export default FAQPage;
