import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar/index';


describe('SearchBar', () => {
  test('renders with isDark prop set to true', () => {
    // Render the SearchBar component with isDark prop set to true

    render(<SearchBar isdark={true} onSubmit={() => {}} />);

    // Get the SearchBarContainer element from the rendered component
    const searchBarContainer = document.getElementById('searchbar-container');

    // Assert that the component is rendered with isDark prop set to true
    expect(searchBarContainer).toBeTruthy();
    expect(searchBarContainer).toHaveAttribute('isdark', 'true');
  });
});
