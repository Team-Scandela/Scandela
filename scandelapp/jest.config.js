module.exports = {
    roots: ["<rootDir>"], //alias pour le root
    testMatch: ["<rootDir>/__tests__/**/*.test.js"], //récupère les test avec ce path
    coverageDirectory: "<rootDir>/coverage", //créer le fichier de coverage à ce path
    collectCoverageFrom: ["<rootDir>/scandelapp/**/*.js"], //récupère le covergae à ce path
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.jsx?$": "babel-jest", //fichiers js/jsx
        "^.+\\.tsx?$": "babel-jest", //fichiers ts/tsx
    },

    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],

    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
    },

    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
};
