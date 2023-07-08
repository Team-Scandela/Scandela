module.exports = {
  roots: ['<rootDir>'], //alias pour le root
  testMatch: ['<rootDir>/__tests__/**/*.test.js'], //récupère les test avec ce path
  coverageDirectory: '<rootDir>/coverage', //créer le fichier de coverage à ce path
  collectCoverageFrom: ['<rootDir>/scandelapp/**/*.js'], //récupère le covergae à ce path
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', //fichiers js/jsx
    '^.+\\.tsx?$': 'babel-jest', //fichiers ts/tsx
  },

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
};