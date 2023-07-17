import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar/index';


describe('SearchBar', () => {
  test('renders with isDark prop set to true', () => {
    // Render the SearchBar component with isDark prop set to true

    render(<SearchBar id={"searchBarComponentIdTest"} isdark={true} onSubmit={() => { }} />);

    // Get the SearchBarContainer element from the rendered component
    const searchBarContainer = document.getElementById('searchBarComponentIdTest');

    var cache = [];

    console.log('component: ' + JSON.stringify(searchBarContainer, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(value)) return;

        // Store value in our collection
        cache.push(value);
      }
      return value;
    }));

    // Assert that the component is rendered with isDark prop set to true
    expect(searchBarContainer).toBeTruthy();
    expect(searchBarContainer).toHaveAttribute();
  });
});
