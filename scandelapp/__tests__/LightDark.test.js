import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LightDark from '../src/components/LightDark/index';

//exemple test sur Composant (ici pour un attribut)
describe('LightDark', () => {
    test('Enables darkmode on click', () => {

        let isDark = false;

        //simulate function to check if it was properly called onClick
        const setIsDark = jest.fn((newMode) => {
            isDark = newMode;
        });

        //renders a LightDark component
        render(<LightDark isDark={isDark} setIsDark={setIsDark} />);

        //gets the button element from component id
        const buttonElement = document.getElementById('lightdark-button');

        //simulate a click
        fireEvent.click(buttonElement);

        //check if seter was called
        expect(setIsDark).toHaveBeenCalledTimes(1);
        //check if isDark prop == true
        expect(isDark).toBe(true);
    });
});
