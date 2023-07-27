import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            searchBarMessage: "Search in Scandela",
        },
    },

    fr: {
        translation: {
            searchBarMessage: "Rechercher dans Scandela",
        },
    },
};

i18n.use(initReactI18next).init({
    resources, // Corrected from "ressources" to "resources"
    lng: "fr", // Default language
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
