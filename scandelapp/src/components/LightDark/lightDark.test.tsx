import React from 'react';
import { render, screen } from '@testing-library/react';
import LightDark from './index';

describe('LightDark', () => {
  test('renders correctly', () => {
    const setIsDark = jest.fn();
    const isDark = true;

    render(<LightDark isDark={isDark} setIsDark={setIsDark} />);

    const textElement = screen.getByText('Hello, LightDark Component!');
    expect(textElement).toBeInTheDocument();
  });
});
