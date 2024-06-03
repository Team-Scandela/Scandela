import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            searchBarMessage: 'Search in Scandela',
            chooseAction: 'Choose action',
            addToActionList: 'Add to action list',
            listActions: 'Action list',
            errorMessageAddAction: 'There is nothing to add to the action list',
            allOptimisation: 'All optimizations',
            turnOffStreetlamp: 'Turn off streetlamp',
            turnOnStreetlamp: 'Turn on streetlamp',
            upIntensisty: 'Increase intensity',
            downIntensity: 'Reduce intensity',
            changeBulb: 'Change bulb',
            addStreetlamp: 'Add streetlamp',
            removeStreetLamp: 'Remove streetLamp',
            infrequentTraffic: 'Infrequent traffic',
            economicImpact: 'Economic impact',
            duringAbsence: 'During your absence',
            lightDarkMode: 'Dark / Light mode',
            language: 'Language',
            loadData: 'Load data',
            notifications: 'Notifications',
            actionListUpdates: 'Action list updates',
            lightDarkModeUpdates: 'Dark / Light mode updates',
            languageUpdates: 'Language updates',
            newsletterUpdates: 'Activate the newsletter',
            loadOfYourPreferences: 'Loading your preferences...',
            titleAddBulbPannel: 'Add bulb',
            titleAddLampPannel: 'Add streetlamp',
            intensity: 'Intensity',
            reference: 'Reference',
            consommation: 'Consommation',
            validate: 'Validate',
            name: 'Name',
            address: 'Address',
            latitude: 'Latitude',
            longitude: 'Longitude',
            height: 'Height',
            lamptype: 'Lamp type',
            foyertype: 'Foyer type',
            titleModifyBulbPannel: 'Modify bulb',
            titleModifyLampPannel: 'Modify lamp',
            electricityPrice: 'Electricity price',
            scandeMenu: 'ScandeMenu',
            signOut: 'Sign out',
            admin: 'Admin',
            premium: 'Premium',
            profile: 'Profile',
            scandela: 'Scandela',
            tickets: 'Tickets',
            faq: 'FAQ',
            buy: 'Buy',
            handleSubscription: 'Handle my subscription',
            titleBuyAdmin: 'Why choose the premium version?',
            title2BuyAdmin:
                'Access exclusive tips that go far beyond the ordinary!',
            title3BuyAdmin:
                'Our advanced algorithms analyze your lighting system data in-depth to provide you with the sharpest optimization recommendations.',
            title4BuyAdmin:
                'Our premium version unlocks new advanced features such as optimization algorithms and performance indicators. Boost your ability to make informed decisions for public lighting!',
            title5BuyAdmin: 'How to upgrade to Premium?',
            title6BuyAdmin:
                'Simply click the button below to upgrade to the premium version now!',
            nameOnTheMap: 'Name on the map',
            cardNumber: 'Card number',
            cvc: 'CVC',
            send: 'Send',
            adminPremium: 'Admin premium',
            sendATicket: 'Send a ticket',
            technicalIssue: 'Technical issue',
            accessAndAuthentication: 'Access and authentication',
            updateRequest: 'Update request',
            feedbackAndSuggestions: 'Feedback and suggestions',
            others: 'Other',
            ticketTitle: 'Ticket title',
            ticketDescpription: 'Ticket description',
            faqTitle: 'What is Scandela?',
            faqTitle2:
                'Why use the premium version of Scandela and what are its advantages?',
            faqTitle3:
                'What are the advantages of using Scandela in my municipality?',
            faqTitle4: 'How does Scandela collect data on public lighting?',
            faqTitle5:
                'What types of optimization recommendations are available in Scandela?',
            faqTitle6:
                'Does Scandela offer specific recommendations based on the characteristics of my municipality?',
            faqTitle7:
                'How can I interpret the optimizations provided by Scandela?',
            faqTitle8:
                'Does Scandela consider environmental criteria in its recommendations?',
            faqTitle9:
                'What is the frequency of updating the optimization recommendations?',
            faqTitle10:
                'Does Scandela offer support in case of a problem or question?',
            faqTitle11:
                'Does Scandela offer solutions for the transition to more sustainable lighting sources?',
            faqTitle12:
                'What are the technical prerequisites for using Scandela?',
            faqTitle13:
                'Does Scandela offer tracking and reporting features to evaluate the impact of optimizations?',
            faqTitle14: 'Are there costs associated with using Scandela?',
            faqTitle15: 'How is the privacy of user data protected?',
            faqTitle16:
                'Is Scandela compatible with existing lighting management systems?',
            faqTitle17:
                'How can I share the results and recommendations of Scandela with other stakeholders in the municipality?   ',
            faqDescription:
                'Scandela is a web-based mapping software for decision-making in public lighting for French municipalities. Our goal is to help local authorities make the right decisions at the right time to manage their streetlights and other lights. We aim to reduce energy and environmental costs associated with public lighting while ensuring the safety of road users. Our solution will enable us to define which street/neighborhood needs to be lit at a given time thanks to multiple parameters. These parameters can be related to safety, biodiversity, traffic, etc. Our web project will be presented via a dashboard and several maps showing different information that will enable the stakeholders to make the right decisions.',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            KWhOfTheCity: 'KWh of the city',
            WhileYouWereAway: 'While you were away',
            placeholderWhileYouWereAway:
                'Malfunction of streetlight 86 Rue Henri IV',
            energyConsumption: 'Energy Consumption',
            ofTheObjective: 'of the objective',
            impactOnTheEnvironment: 'Impact on the environment',
            lightingQuality: 'Lighting quality',
            OfTheAreasHaveGoodLighting: 'of the areas have good lighting',
            createaPriceLimit: 'Create a price limit',
            delete: 'Delete',
            priceLimitDescription:
                'You have the option to set a high or low price limit to be notified by email when the price of electricity exceeds this threshold.',
            loading: 'loading ...',
            theLanguageHasBeenSuccessfullyUpdated:
                'The language has been successfully updated',
            languageUpdate: 'Language update',
            theThemeHasBeenSuccessfullyUpdated:
                'The theme has been successfully updated"',
            themeUpdate: 'Theme update',
            of: 'of',
            hasaScore: 'has a score',
            environmentalImpact: 'Environmental impact',
            actionsHistory : 'Actions history',
        },
    },

    fr: {
        translation: {
            searchBarMessage: 'Rechercher dans Scandela',
            chooseAction: 'Choisissez une action',
            addToActionList: "Ajouter à la liste d'actions",
            listActions: 'Liste des actions',
            errorMessageAddAction:
                "Il n'y rien à ajouter dans la liste d'action",
            allOptimisation: 'Toutes les optimisations',
            turnOffStreetlamp: 'Éteindre lampadaire',
            turnOnStreetlamp: 'Allumer lampadaire',
            upIntensisty: 'Augmenter intensité',
            downIntensity: 'Réduire intensité',
            changeBulb: 'Changer ampoule',
            addStreetlamp: 'Ajouter lampadaire',
            removeStreetLamp: 'Enlever lampadaire',
            infrequentTraffic: 'Passage peu fréquent',
            economicImpact: 'Impact Économique',
            duringAbsence: 'Pendant votre absence',
            lightDarkMode: 'Mode sombre / clair',
            language: 'Langage',
            loadData: 'Charger des données',
            notifications: 'Notifications',
            actionListUpdates: "Mises à jour de la liste d'action",
            lightDarkModeUpdates: 'Mises à jour du mode sombre / clair',
            languageUpdates: 'Mises à jour de la langue',
            newsletterUpdates: 'Activer la newsletter',
            loadOfYourPreferences: 'Chargement de vos préférences...',
            titleAddBulbPannel: 'Ajouter une ampoule',
            titleAddLampPannel: 'Ajouter un lampadaire',
            intensity: 'Intensité',
            reference: 'Reference',
            consommation: 'Consommation',
            validate: 'Valider',
            name: 'Nom',
            address: 'Adresse',
            latitude: 'Latitude',
            longitude: 'Longitude',
            height: 'Hauteur',
            lamptype: 'Type de lampe',
            foyertype: 'Type de foyer',
            titleModifyBulbPannel: 'Modifier ampoule',
            titleModifyLampPannel: 'Modifier lampadaire',
            electricityPrice: "Prix de l'éléctricité",
            scandeMenu: 'ScandeMenu',
            signOut: 'Déconnection',
            admin: 'Admin',
            premium: 'Premium',
            profile: 'Profil',
            scandela: 'Scandela',
            tickets: 'Tickets',
            faq: 'FAQ',
            buy: 'Acheter',
            handleSubscription: 'Gérer mon abonnement',
            titleBuyAdmin: 'Pourquoi choisir la version premium ?',
            title2BuyAdmin:
                "Accédez à des conseils exclusifs qui vont bien au delà de l'ordinaire !",
            title3BuyAdmin:
                "Nos algorithmes perfectionnés analysent en profondeur les données de votre parc lumineux afin de vous offrir les conseils d'optimisation les plus pointus.",
            title4BuyAdmin:
                "Notre version premium déverouille de nouvelles fonctionnalités avancées telles que les algorithmes d'optimisations ou les indicateurs de performances. Boostez votre capacité à prendre des décisions éclairées pour l'éclairage public !",
            title5BuyAdmin: 'Comment passer à Premium ?',
            title6BuyAdmin:
                'Cliquez simplement sur le bouton ci-dessous pour passer à la version premium dès maintenant !',
            nameOnTheMap: 'Nom sur la carte',
            cardNumber: 'Numéro de carte',
            cvc: 'CVC',
            send: 'Soumettre',
            adminPremium: 'Admin premium',
            sendATicket: 'Envoyer un ticket',
            technicalIssue: 'Problème technique',
            accessAndAuthentication: 'Accès et Authentification',
            updateRequest: 'Demande de Mise à Jour',
            feedbackAndSuggestions: 'Feedback et Suggestions',
            other: 'Autre',
            ticketTitle: 'Titre du ticket',
            ticketDescpription: 'Description du ticket',
            faqTitle: "Qu'est-ce que Scandela ?",
            faqTitle2:
                'Pourquoi utiliser la version premium de Scandela et quels sont ses avantages ?',
            faqTitle3:
                "Quels sont les avantages d'utiliser Scandela dans ma commune ?",
            faqTitle4:
                "Comment Scandela collecte-t-elle les données sur l'éclairage public ?",
            faqTitle5:
                "Quels types de conseils d'optimisation sont disponibles dans Scandela ?",
            faqTitle6:
                'Est-ce que Scandela propose des recommandations spécifiques en fonction des caractéristiques de ma commune ?',
            faqTitle7:
                'Comment puis-je interpréter les optimisations fournies par Scandela ?',
            faqTitle8:
                'Est-ce que Scandela prend en compte des critères environnementaux dans ses recommandations ?',
            faqTitle9:
                "Quelle est la fréquence de mise à jour des conseils d'optimisation ?",
            faqTitle10:
                'Est-ce que Scandela offre un support en cas de problème ou de question ?',
            faqTitle11:
                "Est-ce que Scandela propose des solutions pour la transition vers des sources d'éclairage plus durables ?",
            faqTitle12:
                'Quels sont les prérequis techniques pour utiliser Scandela ?',
            faqTitle13:
                "Scandela propose-t-elle des fonctionnalités de suivi et de rapport pour évaluer l'impact des optimisations ?",
            faqTitle14:
                "Y a-t-il des coûts associés à l'utilisation de Scandela ?",
            faqTitle15:
                'Comment la vie privée des données des utilisateurs est-elle protégée ?',
            faqTitle16:
                "Est-ce que Scandela est compatible avec d'autres systèmes de gestion de l'éclairage existants ?",
            faqTitle17:
                "Comment puis-je partager les résultats et les recommandations de Scandela avec d'autres parties prenantes de la commune ?",
            faqDescription:
                "Scandela est un logiciel web cartographique d’aide à la décision pour l’éclairage public des communes françaises. Notre but est d’aider les collectivités locales à prendre les bonnes décisions au bon moment pour gérer leur lampadaire et autres lumières. Nous avons pour objectif de diminuer les dépenses énergétiques et environnementales qui sont liés à l’éclairage public tout en assurant la sécurité des usagers sur les routes. Notre solution permettra de définir quel rue/quartier a besoin d'être allumé de telle à telle heure grâce à  de multiples paramètres. Ces paramètres peuvent être liés à la sécurité, à la biodiversité, au trafic ... Notre projet web se présentera via un tableau de bord et plusieurs cartographies montrant différentes informations qui permettront aux acteurs concernés de prendre les bonnes décisions.",
            name: 'Nom',
            email: 'Email',
            password: 'Mot de passe',
            KWhOfTheCity: 'Kw/h de la ville',
            WhileYouWereAway: 'Pendant votre absence',
            placeholderWhileYouWereAway:
                'Dérèglement du lampadaire 86 Rue Henri IV',
            energyConsumption: 'Consommation énergétique',
            ofTheObjective: "de l'objectif",
            impactOnTheEnvironment: "Impact sur l'environnement",
            lightingQuality: "Qualité de l'éclairage",
            OfTheAreasHaveGoodLighting:
                "des zones disposent d'un bon éclairage",
            createaPriceLimit: 'Créer une limite de prix',
            delete: 'Supprimer',
            priceLimitDescription:
                "Vous avez la possibilité de renseigner une limite de prix haute ou basse afin d'être notifié par mail quand le prix de l'électricité dépassera ce seuil.",
            loading: 'Chargement ...',
            theLanguageHasBeenSuccessfullyUpdated:
                'La langue a bien été mise à jour',
            languageUpdate: 'Mise à jour de la langue',
            theThemeHasBeenSuccessfullyUpdated:
                'Le thème a bien été mis à jour',
            themeUpdate: 'Mise à jour du thème',
            of: 'de',
            hasaScore: 'à un score',
            environmentalImpact: 'Impact environnemental',
            actionsHistory : 'Historique des actions',
        },
    },
};

i18n.use(initReactI18next).init({
    resources, // Corrected from "ressources" to "resources"
    lng: 'fr', // Default language
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
