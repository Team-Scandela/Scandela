import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar/index';

describe('SearchBar', () => {
  test('renders with isDark prop set to true', async () => {
    // Render the SearchBar component with isDark prop set to true

    let tmp = await (render(<SearchBar isdark={true} onSubmit={() => { }} />))

    // Get the SearchBarContainer element from the rendered component
    const searchBarContainer = document.getElementById('searchbar-container');

    if (tmp) {
      // Assert that the component is rendered
      expect(searchBarContainer).toBeInTheDocument();
      expect(searchBarContainer).toHaveAttribute('id', 'searchbar-container');
    }
  });
});
