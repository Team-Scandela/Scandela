import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            searchBarMessage: 'Search in Scandela',
            searchBarPlace: 'Search a place',
            searchBarLamp: 'Search a lamp',
            actionPanel: 'Actions panel',
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
            loadDataDescription:
                'You have the possibility of importing new data into our Scandela tool in order to keep the dataset up to date with which we will be able to advise you.',
            notifications: 'Notifications',
            actionListUpdates: 'Action list updates',
            lightDarkModeUpdates: 'Dark / Light mode updates',
            languageUpdates: 'Language updates',
            newsletterUpdates: 'Activate the newsletter',
            loadOfYourPreferences: 'Loading your preferences...',
            titleAddBulbPannel: 'Add bulb',
            titleAddLampPannel: 'Add streetlamp',
            titleAddEntityPannel: 'Add entity',
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
            titleModifyEntityPannel: 'Modify entity',
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
            actionsHistory: 'Actions history',
            toastHistory: 'Notifications history',
            selectAll: 'Select all',
            deselectAll: 'Deselect all',
            options: 'Options',
            ticketDescription: 'Ticket description',
            activateTooltip: 'Activate tooltip',
            restartTuto: 'Restart tutorial',
            skipTuto: 'Skip tutorial',
            tuto00: "Welcome to the tutorial",
            tuto01: "This tutorial will explain to you what the different features of Scandela are and their benefits. Simply click on the screen to advance through the tutorial. You can skip or restart the tutorial at any time from the settings tab.",
            tuto10: "This tab allows you to view changes during your absence and their impact on the indicators.",
            tuto20: "The search bar allows you to search for a particular city, street, address or street lamp.",
            tuto30: "By clicking on this icon you can alternate between searching for a location and a street lamp.",
            tuto40: "The notification history allows you to view past events within Scandela, you can adjust your preferences in the settings menu.",
            tuto50: "The action history allows you to view the actions that you have chosen and validated within Scandela, you can access more details by clicking on each of them.",
            tuto60: "The filters menu allows you to access the different filters that Scandela offers, they offer varied ways of visualizing your city.",
            tuto70: "This first filter allows you to view the street lamps in your community, you can click on each of them to obtain more information and advice.",
            tuto80: "This second filter allows you to visualize the areas of your community according to their lighting levels, the warmer the color the higher the lighting.",
            tuto90: "This third filter allows you to visualize the quality of the bulbs in your street lamps within your community. Quality is calculated based on the type of bulb and their consumption.",
            tuto100: "This fourth filter allows you to filter your floor lamps according to one of their characteristics, type of bulb, focus, etc...",
            tuto110: "This fifth filter allows you to visualize the traffic within your community, this can help you make better decisions based on which streets are more or less busy.",
            tuto120: "This sixth filter allows you to view the electrical cabinets in your city, you can click on each of them to display the connected street lamps.",
            tuto130: "These three indicators allow you to have an overview of your community, they are subjective to our calculations and the goal is to achieve a balance between them. You can click on each one for more information.",
            tuto140: "This button allows you to access the decision panel which is the heart of Scandela and much more, an explanation of each of the tabs will be presented.",
            tuto150: "Decision panel allows you to view and choose actions that Scandela will have selected for you using our algorithms.",
            tuto160: "The list of actions allows you to view the actions that you have previously selected in the decision panel and to analyze their economic impact as well as on the indicators.",
            tuto170: "Using this tab, you can modify the characteristics of bulbs or street lamps.",
            tuto180: "Using this tab, you can add light bulbs or street lamps which will be displayed on the interactive map.",
            tuto190: "This tab allows you to view the price of electricity in real time, you can also create a high or low price limit in order to be notified by email if the price exceeds this limit.",
            tuto200: "The settings menu allows you to adjust your Scandela preferences: theme, language, notifications, etc. You can also import data into Scandela in order to update the dataset or return to the page reception.",
            tuto210: "Here are the basics of Scandela which will allow you to navigate the application more easily. We invite you to see the FAQ or send us a ticket to answer your other questions.",
            filters: 'Filters',
            filterPin: 'Filter by lamp',
            filterZone: 'Filter by heat zone',
            filterBulbQuality: 'Filter by bulb quality',
            filterComponent: 'Filtre by component',
            filterTraffic: 'Filter by traffic',
            filterCabinet: 'Filtre by electrical cabinet',
            others: 'Others',
        },
    },

    fr: {
        translation: {
            searchBarMessage: 'Rechercher dans Scandela',
            searchBarPlace: 'Rechercher un endroit',
            searchBarLamp: 'Rechercher un lampdaire',
            actionPanel: 'Panneau d\'actions',
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
            loadDataDescription:
                "Vous avez la possibilité d'importer de nouvelles données dans notre outil Scandela afin de maintenir à jour le jeu de données avec lequel nous allons pouvoir vous conseiller.",
            notifications: 'Notifications',
            actionListUpdates: "Mises à jour de la liste d'action",
            lightDarkModeUpdates: 'Mises à jour du mode sombre / clair',
            languageUpdates: 'Mises à jour de la langue',
            newsletterUpdates: 'Activer la newsletter',
            loadOfYourPreferences: 'Chargement de vos préférences...',
            titleAddBulbPannel: 'Ajouter une ampoule',
            titleAddLampPannel: 'Ajouter un lampadaire',
            titleAddEntityPannel: 'Ajouter une entité',
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
            titleModifyBulbPannel: 'Modifier une ampoule',
            titleModifyLampPannel: 'Modifier une lampadaire',
            titleModifyEntityPannel: 'Modifier une entité',
            electricityPrice: "Prix de l'électricité",
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
            actionsHistory: 'Historique des actions',
            toastHistory: 'Historique des notifications',
            selectAll: 'Sélectionner tout',
            deselectAll: 'Désélectionner tout',
            options: 'Paramètres',
            ticketDescription: 'Description du ticket',
            activateTooltip: 'Activer les infos bulles',
            restartTuto: 'Relancer le tutoriel',
            skipTuto: 'Passer le tutoriel',
            tuto00: 'Bienvenue dans le tutoriel',
            tuto01: "Ce tutoriel vous expliquera quelles sont les différentes fonctionnalités de Scandela et leurs intérêts. Il vous suffit de cliquer sur l'écran pour avancer dans le tutoriel. Vous pouvez passer ou relancer à tout moment le tutoriel depuis l'onglet paramètres.",
            tuto10: "Cet onglet vous permet de visualiser les évolutions pendant votre absence et leurs impacts sur les indicateurs (qui vous seront présentés plus tard).",
            tuto20: "La barre de recherche vous permet de rechercher une ville, une rue, une adresse ou bien un lampadaire en particulier.",
            tuto30: "En cliquant sur cette icône vous pouvez alterner entre la recherche de lieu et de lampadaire.",
            tuto40: "L'historique des notifications vous permet de visualiser les événements passés au sein de Scandela, vous pouvez ajuster vos préférences dans le menu paramètrès.",
            tuto50: "L'historique des actions vous permet de visualiser les actions que vous aurez choisies et validées au sein de Scandela, vous pouvez accèder à plus de détails en cliquant sur chacune d'entre elles.",
            tuto60: "Le menu des filtres vous permet d'accèder aux différents filtres que propose Scandela, ils offrent des manières variées de visualiser votre ville.",
            tuto70: "Ce premier filtre vous permet de visualiser les lampadaires de votre colléctivité, vous pouvez cliquer sur chacun d'entre eux pour obtenir plus d'informations et de conseils.",
            tuto80: "Ce deuxième filtre vous permet de visualiser les zones de votre colléctivité en fonction de leurs degrés d'éclairage, plus la couleur est chaude plus l'éclairage est élevé.",
            tuto90: "Ce troisième filtre vous permet de visualiser la qualité des ampoules de vos lampadaires au sein de votre colléctivité. La qualité est calculée en fonction du type de bulbe et leur consommation.",
            tuto100: "Ce quatrième filtre vous permet de filtrer vos lampadaires en fonction d'une de leurs caractéristiques, type de bulbe, de foyer, etc...",
            tuto110: "Ce cinquième filtre vous permet de visualiser le traffic au sein de votre colléctivité, cela peut vous aider à prendre de meilleures décisions en fonctions des rues plus ou moins passantes.",
            tuto120: "Ce sixième filtre vous permet de visualiser les armoires électriques de votre ville, vous pouvez cliquer sur chacune d'entre elles afin d'afficher les lampadaires reliés.",
            tuto130: "Ces trois indicateurs vous permettent d'avoir une vue d'ensemble sur votre colléctivité, ils sont subjectifs à nos calculs et le but est d'atteindre un équilbre entre eux. Vous pouvez cliquer sur chacun d'entre eux pour plus d'informations.",
            tuto140: "Ce bouton vous permet d'accèder à l'aide à la décision qui est le coeur de Scandela et bien plus encore, une explication de chacun des onglets sera présentée.",
            tuto150: "L'aide à la décision vous permet de visualiser et choisir des actions que Scandela aura sélectionnées pour vous grâce à nos algorithmes.",
            tuto160: "La liste des actions vous permet de visualiser les actions que vous aurez préalablement sélectionnées dans l'aide à la décision et d'analyser leurs impact économique et ainsi que sur les indicateurs.",
            tuto170: "Grâce à cet onglet, vous pouvez modifier les caractéristiques des ampoules ou bien des lampadaires.",
            tuto180: "Grâce à cet onglet, vous pouvez ajouter des ampoules ou bien des lampadaires qui s'afficheront sur la carte intéractive.",
            tuto190: "Cet onglet vous permet de visualiser le prix de l'électricité en temps réel, vous pouvez également créer une limite de prix haute ou basse afin d'être notifier par mail si le prix dépasse cette limite.",
            tuto200: "Le menu des paramètres vous permet d'ajuster vos préférences de Scandela: le thème, la langue, les notifications, etc... Vous pourrez également importer des données sur Scandela afin de mettre à jour le jeu de données ou encore revenir à la page d'accueil.",
            tuto210: "Voici les bases de Scandela qui vous permettront de naviguer plus simplement dans l'application. Nous vous invitons à aller voir la FAQ ou à nous envoyer un ticket pour répondre à vos autres questions.",
            filters: 'Filtres',
            filterPin: 'Filtre par lampadaires',
            filterZone: "Filtre par zone d'éclairage",
            filterBulbQuality: 'Filtre par qualité de bulbe',
            filterComponent: 'Filtre par composant',
            filterTraffic: 'Filtre par traffic',
            filterCabinet: 'Filtre par armoire électrique',
            others: 'Autres',
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
