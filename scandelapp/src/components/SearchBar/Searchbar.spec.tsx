import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './index';

// Test if my parameter isDark is true then this is dark
test('renders SearchBar component with dark mode', () => {
  const wrapper = shallow(<SearchBar isDark={true} />);

  expect(wrapper.find('SearchBarContainer').prop('isDark')).toBe(true);
});

// // Test if my parameter isDark is false then this is white
// test('renders SearchBar component with light mode', () => {
//   const wrapper = shallow(<SearchBar isDark={false} />);
  
//   expect(wrapper.find('SearchBarContainer').prop('isDark')).toBe(false);
// });