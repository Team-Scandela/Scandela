import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => changeLanguage("en")}>EN</button>
        </div>
    );
};

export default LanguageSelector;
