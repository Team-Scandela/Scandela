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
