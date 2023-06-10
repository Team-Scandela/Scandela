import * as React from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import LightDark from '../components/LightDark';
import SearchBar from '../components/SearchBar';
import DecisionMenu from '../components/DecisionMenu';
import EditInPdfPannel from '../components/EditInPdfPannel';

/** Main page of the app */
const Main: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<string>('none');
  const [isButtonEditInPdfClicked, setIsButtonEditInPdfClicked] = React.useState<boolean>(false);

  const handleButtonEditInPdfClick = () => {
    setIsButtonEditInPdfClicked(prevState => !prevState);
  };

  return (
    <div>
      <Map filter={filter} isDark={isDark} />
      <SearchBar isDark={isDark} />
      <LightDark isDark={isDark} setIsDark={setIsDark} />
      <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark} />
      <DecisionMenu isDark={isDark} handleButtonEditInPdfClick={handleButtonEditInPdfClick} isButtonEditInPdfClicked={isButtonEditInPdfClicked}/>
      {isButtonEditInPdfClicked && <EditInPdfPannel isDark={isDark} />}
    </div>
  );
};

export default Main;
