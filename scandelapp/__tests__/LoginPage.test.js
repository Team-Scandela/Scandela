import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginModule from '../src/components/LoginModule/index';


describe('Login Page', () => {
    test('renders login form with initial values', async () => {
    render(<LoginModule />);

    const signInFormTest = document.getElementById('signInForm')

    expect(signInFormTest).toBeInTheDocument();
    expect(signInFormTest).toHaveTextContent("Create Account");

  });
});
