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
            themeUpdates: 'Dark / Light mode updates',
            languageUpdates: 'Language updates',
            actionsListExportedUpdates: 'Actions list exported updates',
            notificationsPreferencesUpdates:
                'Notifications preferences updates',
            actionsListSuccessfullyUpdated: 'Actions list successfully updated',
            nothingToAddToTheActionsList: 'Nothing to add to the actions list',
            theLanguageHasBeenSuccessfullyUpdated:
                'The language has been successfully updated',
            theThemeHasBeenSuccessfullyUpdated:
                'The theme has been successfully updated"',
            actionsListSuccessfullyExported:
                'The actions list has been successfully exported',
            notificationsPreferencesSuccessfullyUpdated:
                'The notifications preferences have been successfully updated',
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
            subscriptionDescription:
                'Easily subscribe to our Premium plan via Stripe for secure payment. Enjoy exclusive features with the flexibility to cancel anytime. Your Premium access will remain active until the end of the current billing period.',
            buyPremium: 'Buy the premium subscription.',
            cancelPremium: 'Cancel the premium subscription.',
            buyPremiumValidation:
                'Your subscription has been successfully purchased. Please log in again.',
            cancelPremiumValidation:
                'Your subscription has been successfully canceled. Please log in again.',
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
            faqTitle15:
                'How can I share the results and recommendations of Scandela with other stakeholders in the municipality?',
            faqTitle16:
                'Is Scandela compatible with existing lighting management systems?',
            faqDescription:
                'Scandela is a web-based mapping software designed to support decision-making in public lighting for French municipalities. Our goal is to help local authorities make informed decisions about managing streetlights and other lighting fixtures. We aim to reduce energy and environmental costs associated with public lighting while ensuring the safety of road users. Our solution will identify which streets or neighborhoods need illumination at specific times, based on various parameters such as safety, biodiversity, traffic, and more. The web application will feature a dashboard and several maps displaying different types of information to enable stakeholders to make optimal decisions.',
            faqDescription1:
                'The premium version of Scandela provides several advantages over the standard version. It offers access to a more comprehensive set of features, including advanced decision-support tools that are crucial for optimizing public lighting management. Premium users also benefit from detailed dashboards and key indicators that provide a thorough overview of your municipality. Additionally, this version allows for more detailed tracking of performance and lighting needs, enabling more precise and effective management.',
            faqDescription2:
                "Using Scandela in your municipality offers several significant benefits. Firstly, Scandela’s decision-support tools provide tailored recommendations for optimizing your city's lighting infrastructure through our advanced algorithms. You will also benefit from detailed monitoring of your municipality via our indicators, which give you an overview of three key factors: energy consumption, environmental impact, and light quality. Additionally, Scandela features an intuitive and modern application that allows you to visualize your city’s lighting in a clear and efficient manner.",
            faqDescription3:
                'For the demo version of Scandela, we use open source data from OpenStreetMap for the city of Nantes. Regarding filters and other parameters, we can incorporate data from various sources, such as open source datasets or Google Maps. For our clients, the data is supplied by them, allowing us to work with their specific information. Additionally, clients have the ability to update these data as needed.',
            faqDescription4:
                'Scandela offers various optimization recommendations for your public lighting through its advanced algorithms. We can suggest actions such as changing bulbs, removing or adding streetlights, or adjusting their intensity. Additionally, we may recommend turning streetlights on or off based on the specific needs identified. These recommendations aim to enhance the efficiency and management of your public lighting system.',
            faqDescription5:
                "Yes, Scandela provides recommendations tailored to the characteristics of your municipality. While the demo version is limited to the city of Nantes, the premium version is designed to adapt to the specific features of your locality. The decision-support recommendations are customized based on your lighting infrastructure, and the indicators are also adjusted according to your municipality's specific data.",
            faqDescription6:
                'The optimizations provided by Scandela are based on algorithms that offer recommendations derived from our calculations. However, these suggestions may be influenced by external factors that only you may be aware of. We encourage you to be critical and not to apply our advice blindly. You have the option to export your choices as a PDF for further consideration before making final decisions.',
            faqDescription7:
                'Yes, Scandela takes environmental criteria into account in its recommendations. Environmental impact is a key factor integrated into many of our calculations. We provide advice based on the energy consumption of bulbs and the potential removal of streetlights in over-lit areas. Additionally, we offer a dedicated indicator for environmental impact, allowing you to get an overview of your city’s environmental situation.',
            faqDescription8:
                'Optimization recommendations are updated with each login to the application. However, significant changes are unlikely between closely spaced logins. Major updates may occur if the dataset used for calculations is updated.',
            faqDescription9:
                "Yes, Scandela provides support for any issues or questions. On the application’s homepage, you will find a 'Support / Ticket' tab that allows you to report bugs, problems, or suggest improvements. We are here to assist you and ensure that you have the best possible experience with our application.",
            faqDescription10:
                'Yes, Scandela offers solutions for transitioning to more sustainable lighting sources. In our decision-support tools, we provide advice on changing streetlight bulbs to use more energy-efficient options. These recommendations aim to reduce energy consumption and promote more environmentally friendly lighting solutions.',
            faqDescription11:
                'To use the premium version of Scandela, you will need a computer and an internet connection. Additionally, it is necessary to be a public lighting professional from your municipality to provide us with your dataset.',
            faqDescription12:
                "Yes, Scandela offers tracking and reporting features to evaluate the impact of optimizations. After selecting and adding optimizations to your action list, you can access a short- and long-term economic summary of your choices. Additionally, you can assess the impact of these optimizations on Scandela's indicators, allowing you to monitor results and measure the benefits of the implemented actions.",
            faqDescription13:
                'Yes, there are costs associated with using Scandela. The demo version is free, while the premium version is available via a monthly subscription at a price of €49.99 per month.',
            faqDescription14:
                'Scandela provides two options for sharing results and recommendations with other stakeholders in the municipality. The first option is to export your choices as a PDF directly from the application, allowing you to distribute the information in a clear and straightforward manner. The second option is a mobile extension in the form of a task list, which allows an external member to go on-site and follow the recommendations through this extension.',
            faqDescription15:
                "Scandela is a web application that provides optimization advice and various ways to visualize your municipality, but it does not allow for remote control of public lighting. Therefore, it is best to use Scandela as an additional module alongside existing lighting management systems. This way, you can benefit from Scandela's recommendations and visualizations while continuing to use your current control applications.",
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
            tuto00: 'Welcome to the tutorial',
            tuto01: 'This tutorial will explain to you what the different features of Scandela are and their benefits. Simply click on the screen to advance through the tutorial. You can skip or restart the tutorial at any time from the settings tab.',
            tuto10: 'This tab allows you to view changes during your absence and their impact on the indicators.',
            tuto20: 'The search bar allows you to search for a particular city, street, address or street lamp.',
            tuto30: 'By clicking on this icon you can alternate between searching for a location and a street lamp.',
            tuto40: 'The notification history allows you to view past events within Scandela, you can adjust your preferences in the settings menu.',
            tuto50: 'The action history allows you to view the actions that you have chosen and validated within Scandela, you can access more details by clicking on each of them.',
            tuto60: 'The filters menu allows you to access the different filters that Scandela offers, they offer varied ways of visualizing your city.',
            tuto70: 'This first filter allows you to view the street lamps in your community, you can click on each of them to obtain more information and advice.',
            tuto80: 'This second filter allows you to visualize the areas of your community according to their lighting levels, the warmer the color the higher the lighting.',
            tuto90: 'This third filter allows you to visualize the quality of the bulbs in your street lamps within your community. Quality is calculated based on the type of bulb and their consumption.',
            tuto100:
                'This fourth filter allows you to filter your floor lamps according to one of their characteristics, type of bulb, focus, etc...',
            tuto110:
                'This fifth filter allows you to visualize the traffic within your community, this can help you make better decisions based on which streets are more or less busy.',
            tuto120:
                'This sixth filter allows you to view the electrical cabinets in your city, you can click on each of them to display the connected street lamps.',
            tuto121:
                'This filter highlights natural areas on the map. When the "Black Tram" filter is enabled, nature zones are clearly marked, allowing you to easily identify green spaces, forests, and other natural environments.',
            tuto130:
                'These three indicators allow you to have an overview of your community, they are subjective to our calculations and the goal is to achieve a balance between them. You can click on each one for more information.',
            tuto140:
                'This button allows you to access the decision panel which is the heart of Scandela and much more, an explanation of each of the tabs will be presented.',
            tuto150:
                'Decision panel allows you to view and choose actions that Scandela will have selected for you using our algorithms.',
            tuto160:
                'The list of actions allows you to view the actions that you have previously selected in the decision panel and to analyze their economic impact as well as on the indicators.',
            tuto170:
                'Using this tab, you can modify the characteristics of bulbs or street lamps.',
            tuto180:
                'Using this tab, you can add light bulbs or street lamps which will be displayed on the interactive map.',
            tuto190:
                'This tab allows you to view the price of electricity in real time, you can also create a high or low price limit in order to be notified by email if the price exceeds this limit.',
            tuto200:
                'The settings menu allows you to adjust your Scandela preferences: theme, language, notifications, etc. You can also import data into Scandela in order to update the dataset or return to the page reception.',
            tuto210:
                'Here are the basics of Scandela which will allow you to navigate the application more easily. We invite you to see the FAQ or send us a ticket to answer your other questions.',
            filters: 'Filters',
            filterPin: 'Filter by lamp',
            filterZone: 'Filter by heat zone',
            filterBulbQuality: 'Filter by bulb quality',
            filterComponent: 'Filtre by component',
            filterTraffic: 'Filter by traffic',
            filterCabinet: 'Filter by electrical cabinet',
            filterEco: 'Filter by ecological zones',
            others: 'Others',
            titleLampListPannel: 'Lamp list',
            toDo: 'To-do list',
            toDoReady: 'Your to-do list is ready',
            toDoLink: 'Copy the link',
            toDoOpen: 'Open the list',
            toDoError: 'Nothings in the action list',
            filterAdvcanced: 'Advanced filters',
            selectFilter: 'Select a filter :',
            apply: 'Apply',
            onTheGround: 'Lamp on the ground',
            noFilter: 'No filter',
            badBulb: 'Bulb with bad quality',
            lamps: 'lamps',
            badQuality: 'Bad lightning quality',
            midQuality: 'normal lightning quality',
            goodQuality: 'good lightning quality',
            unknownQuality: 'unknown lightning quality',
            quality: 'Quality',
            noEvent: 'No new events since your last visit',
            needDeco:
                'After buying the premium version, you will need to log out and log back in to activate the premium features.',
            noActionSelected: 'No action selected',
            actionsListSuccessfullyValidated:
                'The actions list has been successfully validated',
            noActionAdded:
                'No action has been validated, please select one in the decision support panel.',
            demoVersion: 'Demo version',
            premiumVersion: 'Premium version',
            adminAccount: 'Administrator account',
            userAccount: 'User account',
            needPremium: 'You need the premium version to access this feature',
            inProgress : 'In Progress',
            toDo : 'To Do',
            done : "Done",
            toDoLoading : "To-Do list loading, please wait"
        },
    },

    fr: {
        translation: {
            searchBarMessage: 'Rechercher dans Scandela',
            searchBarPlace: 'Rechercher un endroit',
            searchBarLamp: 'Rechercher un lampdaire',
            actionPanel: "Panneau d'actions",
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
            themeUpdates: 'Mises à jour du mode sombre / clair',
            languageUpdates: 'Mises à jour de la langue',
            actionsListExportedUpdates: 'Export de la liste des actions',
            notificationsPreferencesUpdates:
                'Mise à jour des préférences de notifications',
            actionsListSuccessfullyUpdated:
                'La liste des actions à bien été mise à jour',
            nothingToAddToTheActionsList: "Rien à ajouter à la liste d'actions",
            theLanguageHasBeenSuccessfullyUpdated:
                'La langue a bien été mise à jour',
            theThemeHasBeenSuccessfullyUpdated:
                'Le thème a bien été mis à jour',
            actionsListSuccessfullyExported:
                'La liste des actions à bien été exporté',
            notificationsPreferencesSuccessfullyUpdated:
                'Les préférences de notifications ont bien été mises à jour',
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
            subscriptionDescription:
                'Souscrivez facilement à notre abonnement Premium via Stripe pour un paiement sécurisé. Profitez des fonctionnalités exclusives, avec la liberté de résilier à tout moment : votre accès Premium reste actif jusqu’à la fin de la période en cours.',
            buyPremium: "Acheter l'abonnement premium.",
            cancelPremium: "Annuler l'abonnement premium.",
            buyPremiumValidation:
                'Votre abonnement a bien été acheté, veuillez vous reconnecter.',
            cancelPremiumValidation:
                'Votre abonnement a bien été annulé, veuillez vous reconnecter.',
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
                "Comment puis-je partager les résultats et les recommandations de Scandela avec d'autres parties prenantes de la commune ?",
            faqTitle16:
                "Est-ce que Scandela est compatible avec d'autres systèmes de gestion de l'éclairage existants ?",
            faqDescription:
                "Scandela est un logiciel cartographique basé sur le web destiné à faciliter la prise de décisions concernant l'éclairage public pour les municipalités françaises. Notre objectif est d'aider les autorités locales à prendre les bonnes décisions au bon moment pour gérer leurs lampadaires et autres installations lumineuses. Nous visons à réduire les coûts énergétiques et environnementaux associés à l'éclairage public tout en garantissant la sécurité des usagers de la route. Notre solution permettra de déterminer quelles rues ou quartiers nécessitent un éclairage à un moment donné grâce à plusieurs paramètres, tels que la sécurité, la biodiversité, le trafic, etc. Notre projet web sera présenté à travers un tableau de bord et plusieurs cartes affichant différentes informations qui permettront aux parties prenantes de prendre les bonnes décisions.",
            faqDescription1:
                'La version premium de Scandela offre de nombreux avantages par rapport à la version standard. Elle donne accès à un ensemble plus complet de fonctionnalités, notamment des outils avancés pour l’aide à la décision, essentiels pour optimiser la gestion de l’éclairage public. Les utilisateurs de la version premium bénéficient également de tableaux de bord détaillés et d’indicateurs clés qui offrent une vue d’ensemble approfondie de votre collectivité. De plus, cette version permet un suivi plus accru des performances et des besoins en éclairage, facilitant ainsi une gestion plus précise et efficace.',
            faqDescription2:
                "Utiliser Scandela dans votre commune offre plusieurs avantages significatifs. Tout d'abord, l’aide à la décision fournie par Scandela permet d'obtenir des conseils personnalisés pour optimiser le parc d’éclairage de votre ville grâce à nos algorithmes sophistiqués. Vous bénéficierez également d’un suivi détaillé de votre commune via nos indicateurs, qui vous fournissent une vue d'ensemble sur trois facteurs clés : la consommation énergétique, l'impact environnemental, et la qualité lumineuse. De plus, Scandela propose une application intuitive et moderne qui vous permet de visualiser l’éclairage de votre ville de manière claire et efficace.",
            faqDescription3:
                "Pour la version de démonstration de Scandela, nous utilisons des données open source provenant d'OpenStreetMap pour la ville de Nantes. En ce qui concerne les filtres et autres paramètres, nous pouvons intégrer des données provenant de diverses sources, telles que des données open source ou Google Maps. Pour nos clients, les données sont fournies par eux-mêmes, ce qui nous permet de travailler avec ces informations spécifiques. De plus, les clients ont la possibilité de mettre à jour ces données selon leurs besoins.",
            faqDescription4:
                "Scandela propose divers conseils d'optimisation pour votre éclairage public grâce à ses algorithmes avancés. Nous pouvons vous recommander des actions telles que changer les ampoules, retirer ou ajouter des lampadaires, ou encore ajuster leur intensité. De plus, nous pouvons vous suggérer d'allumer ou d'éteindre certains lampadaires selon les besoins spécifiques identifiés. Ces recommandations visent à améliorer l'efficacité et la gestion de votre éclairage public.",
            faqDescription5:
                'Oui, Scandela propose des recommandations spécifiques en fonction des caractéristiques de votre commune. La version démo est limitée à la ville de Nantes, mais la version premium est conçue pour s’adapter aux particularités de votre collectivité. Les recommandations fournies par l’aide à la décision sont personnalisées en fonction de votre parc d’éclairage, et les indicateurs sont également ajustés en fonction des données spécifiques à votre commune.',
            faqDescription6:
                'Les optimisations fournies par Scandela sont basées sur des algorithmes qui proposent des recommandations objectives en fonction de nos calculs. Cependant, ces propositions peuvent être influencées par des paramètres extérieurs que vous seul pouvez connaître. Nous vous encourageons donc à rester critique et à ne pas appliquer nos conseils de manière aveugle. Vous avez la possibilité d’exporter vos choix en PDF pour une réflexion plus approfondie avant de prendre des décisions finales.',
            faqDescription7:
                "Oui, Scandela prend en compte des critères environnementaux dans ses recommandations. L'impact environnemental est un facteur essentiel intégré dans de nombreux calculs. Nous vous proposons des conseils basés sur la consommation énergétique des ampoules, ainsi que sur la possibilité de retirer des lampadaires dans des zones trop éclairées. De plus, nous offrons un indicateur dédié à l'impact environnemental, vous permettant d'obtenir une vue d'ensemble de la situation environnementale de votre ville.",
            faqDescription8:
                "Les conseils d'optimisation sont mis à jour à chaque connexion à l'application. Cependant, il est rare de constater de grands changements entre des connexions rapprochées. Des mises à jour plus importantes peuvent se produire si le jeu de données utilisé pour les calculs est lui-même mis à jour.",
            faqDescription9:
                "Oui, Scandela offre un support en cas de problème ou de question. Sur la page d'accueil de l'application, vous trouverez un onglet 'Support / Ticket' qui vous permet de signaler des bugs, des problèmes ou de proposer des améliorations. Nous sommes là pour vous aider et nous assurer que vous avez la meilleure expérience possible avec notre application.",
            faqDescription10:
                "Oui, Scandela propose des solutions pour la transition vers des sources d'éclairage plus durables. Dans notre aide à la décision, nous offrons des conseils sur le changement des bulbes des lampadaires pour adopter des types de bulbes moins énergivores. Ces recommandations visent à réduire la consommation énergétique et à promouvoir des solutions d'éclairage plus respectueuses de l'environnement.",
            faqDescription11:
                "Pour utiliser la version premium de Scandela, vous aurez besoin d'un ordinateur et d'une connexion Internet. De plus, il est nécessaire d'être un professionnel de l'éclairage public de votre commune afin de pouvoir nous fournir votre jeu de données.",
            faqDescription12:
                "Oui, Scandela propose des fonctionnalités de suivi et de rapport pour évaluer l'impact des optimisations. Après avoir sélectionné et ajouté les optimisations à votre liste d'actions, vous pourrez accéder à un bilan économique à court et à long terme de vos choix. De plus, vous pourrez évaluer l'impact de ces optimisations sur les indicateurs de Scandela, vous permettant ainsi de suivre les résultats et de mesurer les bénéfices des actions mises en œuvre.",
            faqDescription13:
                "Oui, il y a des coûts associés à l'utilisation de Scandela. La version démo est gratuite, tandis que la version premium est disponible sur abonnement mensuel au prix de 49,99 € par mois.",
            faqDescription14:
                "Scandela offre deux options pour partager les résultats et les recommandations avec d'autres parties prenantes de la commune. La première option est d'exporter vos choix sous format PDF directement depuis l'application, ce qui vous permet de distribuer les informations de manière simple et claire. La deuxième option est une petite extension mobile sous forme de liste de tâches, qui permet à un membre externe de se rendre sur le terrain et de suivre les propositions directement via cette extension.",
            faqDescription15:
                "Scandela est une application web qui offre des conseils d'optimisation et différentes méthodes de visualisation de votre collectivité, mais elle ne permet pas de contrôler l'éclairage public à distance. Il est donc préférable d'utiliser Scandela comme un module complémentaire aux systèmes de gestion de l'éclairage existants. Ainsi, vous pouvez tirer parti des recommandations et des visualisations de Scandela tout en continuant à utiliser vos applications de contrôle actuelles.",
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
            tuto10: 'Cet onglet vous permet de visualiser les évolutions pendant votre absence et leurs impacts sur les indicateurs (qui vous seront présentés plus tard).',
            tuto20: 'La barre de recherche vous permet de rechercher une ville, une rue, une adresse ou bien un lampadaire en particulier.',
            tuto30: 'En cliquant sur cette icône vous pouvez alterner entre la recherche de lieu et de lampadaire.',
            tuto40: "L'historique des notifications vous permet de visualiser les événements passés au sein de Scandela, vous pouvez ajuster vos préférences dans le menu paramètrès.",
            tuto50: "L'historique des actions vous permet de visualiser les actions que vous aurez choisies et validées au sein de Scandela, vous pouvez accèder à plus de détails en cliquant sur chacune d'entre elles.",
            tuto60: "Le menu des filtres vous permet d'accèder aux différents filtres que propose Scandela, ils offrent des manières variées de visualiser votre ville.",
            tuto70: "Ce premier filtre vous permet de visualiser les lampadaires de votre colléctivité, vous pouvez cliquer sur chacun d'entre eux pour obtenir plus d'informations et de conseils.",
            tuto80: "Ce deuxième filtre vous permet de visualiser les zones de votre colléctivité en fonction de leurs degrés d'éclairage, plus la couleur est chaude plus l'éclairage est élevé.",
            tuto90: 'Ce troisième filtre vous permet de visualiser la qualité des ampoules de vos lampadaires au sein de votre colléctivité. La qualité est calculée en fonction du type de bulbe et leur consommation.',
            tuto100:
                "Ce quatrième filtre vous permet de filtrer vos lampadaires en fonction d'une de leurs caractéristiques, type de bulbe, de foyer, etc...",
            tuto110:
                'Ce cinquième filtre vous permet de visualiser le traffic au sein de votre colléctivité, cela peut vous aider à prendre de meilleures décisions en fonctions des rues plus ou moins passantes.',
            tuto120:
                "Ce sixième filtre vous permet de visualiser les armoires électriques de votre ville, vous pouvez cliquer sur chacune d'entre elles afin d'afficher les lampadaires reliés.",
            tuto121:
                'Ce filtre met en évidence les zones naturelles sur la carte. En activant le filtre "Trame Noir," les zones de nature sont distinctement colorées, ce qui vous permet d’identifier facilement les espaces verts, forêts, et autres environnements naturels.',
            tuto130:
                "Ces trois indicateurs vous permettent d'avoir une vue d'ensemble sur votre colléctivité, ils sont subjectifs à nos calculs et le but est d'atteindre un équilbre entre eux. Vous pouvez cliquer sur chacun d'entre eux pour plus d'informations.",
            tuto140:
                "Ce bouton vous permet d'accèder à l'aide à la décision qui est le coeur de Scandela et bien plus encore, une explication de chacun des onglets sera présentée.",
            tuto150:
                "L'aide à la décision vous permet de visualiser et choisir des actions que Scandela aura sélectionnées pour vous grâce à nos algorithmes.",
            tuto160:
                "La liste des actions vous permet de visualiser les actions que vous aurez préalablement sélectionnées dans l'aide à la décision et d'analyser leurs impact sur l'économie et sur indicateurs.",
            tuto170:
                'Grâce à cet onglet, vous pouvez modifier les caractéristiques des ampoules ou bien des lampadaires.',
            tuto180:
                "Grâce à cet onglet, vous pouvez ajouter des ampoules ou bien des lampadaires qui s'afficheront sur la carte intéractive.",
            tuto190:
                "Cet onglet vous permet de visualiser le prix de l'électricité en temps réel, vous pouvez également créer une limite de prix haute ou basse afin d'être notifier par mail si le prix dépasse cette limite.",
            tuto200:
                "Le menu des paramètres vous permet d'ajuster vos préférences de Scandela: le thème, la langue, les notifications, etc... Vous pourrez également importer des données sur Scandela afin de mettre à jour le jeu de données ou encore revenir à la page d'accueil.",
            tuto210:
                "Voici les bases de Scandela qui vous permettront de naviguer plus simplement dans l'application. Nous vous invitons à aller voir la FAQ ou à nous envoyer un ticket pour répondre à vos autres questions.",
            filters: 'Filtres',
            filterPin: 'Filtre par lampadaires',
            filterZone: "Filtre par zone d'éclairage",
            filterBulbQuality: 'Filtre par qualité de bulbe',
            filterComponent: 'Filtre par composant',
            filterTraffic: 'Filtre par traffic',
            filterCabinet: 'Filtre par armoire électrique',
            filterEco: 'Filtre par zone écologiquement sensible',
            others: 'Autres',
            titleLampListPannel: 'Liste des lampadaires',
            toDo: 'To-do list',
            toDoReady: 'Votre to-do liste est prête',
            toDoLink: 'Copier le lien',
            toDoOpen: 'Ouvrir la liste',
            filterAdvcanced: 'Filtre avancé',
            selectFilter: 'Sélectionner un filtre :',
            apply: 'Appliquer',
            onTheGround: 'Lampes au sol',
            noFilter: 'Aucun filtre',
            badBulb: 'Ampoules de mauvaise qualité',
            lamps: 'lampadaires',
            badQuality: "Mauvaise qualité d'éclairage",
            midQuality: 'Éclairage sensiblement correct',
            goodQuality: "Bonne qualité d'éclairage",
            unknownQuality: "Qualité d'éclairage inconnue",
            quality: 'Qualité',
            noEvent: 'Aucun nouvel événement depuis votre dernière visite',
            needDeco:
                'Après avoir acheté la version premium, vous devez vous reconnecter pour que les changements prennent effet.',
            noActionSelected: 'Aucune action sélectionnée',
            actionsListSuccessfullyValidated:
                'La liste des actions a bien été validée',
            noActionAdded:
                "Aucune action n'a été validé, veuillez en sélectionner une dans le panneau d'aide à la décision",
            demoVersion: 'Version de démonstration',
            premiumVersion: 'Version premium',
            adminAccount: 'Compte administrateur',
            userAccount: 'Compte utilisateur',
            needPremium: 'Pour accéder à cette fonctionnalité, vous devez acheter la version premium.',
            inProgress : 'En cours',
            toDo : 'A Faire',
            done : "Terminée",
            toDoLoading : "To-Do list en chargement, veuillez patienter..."
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
