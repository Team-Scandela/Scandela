// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Main from '../src/pages/main';

// describe('Main', () => {
//     // test('Rendu initial des composants avec les bonnes props', () => {
//     //     const { getByTestId } = render(<Main />);

//     //     // Vérifier que tous les composants sont rendus
//     //     expect(getByTestId('mapComponentId')).toBeInTheDocument();
//     //     expect(getByTestId('searchBarComponentId')).toBeInTheDocument();
//     //     expect(getByTestId('lightDarkComponentId')).toBeInTheDocument();
//     //     expect(getByTestId('filterMenuComponentId')).toBeInTheDocument();
//     //     expect(getByTestId('decisionMenuComponentId')).toBeInTheDocument();
//     //     expect(getByTestId('editinPdfPannelComponentId')).toBeInTheDocument();
//     //     expect(getByTestId('gaugesComponentId')).toBeInTheDocument();

//     //     // Vérifier que les composants ont les bonnes props
//     //     // Exemple : expect(getByTestId('map-component')).toHaveAttribute('isDark', 'true');
//     // });

//     test('Appel des fonctions de gestion des événements', () => {
//         // Créer des fonctions de gestion des événements fictives pour les tester
//         const handleSearchMock = jest.fn();
//         const handleButtonEditInPdfClickMock = jest.fn();

//         const { getByTestId } = render(
//             <Main
//                 handleSearch={handleSearchMock}
//                 handleButtonEditInPdfClick={handleButtonEditInPdfClickMock}
//             />
//         );

//         // Simuler une interaction qui déclenche la fonction handleSearch
//         const searchInput = getByTestId('searchbar-input');
//         fireEvent.change(searchInput, { target: { value: 'test' } });
//         fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

//         // Vérifier que la fonction handleSearch a été appelée
//         expect(handleSearchMock).toHaveBeenCalledWith('test');

//         // Simuler une interaction qui déclenche la fonction handleButtonEditInPdfClick
//         const editButton = getByTestId('decisionmenu-edit-button');
//         fireEvent.click(editButton);

//         // Vérifier que la fonction handleButtonEditInPdfClick a été appelée
//         expect(handleButtonEditInPdfClickMock).toHaveBeenCalled();
//     });

//     test('Mise à jour des états lors des interactions', () => {
//         const { getByTestId } = render(<Main />);

//         // Simuler une interaction qui met à jour un état
//         const filterMenu = getByTestId('filterMenuComponentId');
//         fireEvent.change(filterMenu, { target: { value: 'filterValue' } });

//         // Vérifier que l'état filter a été mis à jour
//         expect(filterMenu).toHaveValue('filterValue');

//         // ... Autres interactions et vérifications d'états ...
//     });
// });
