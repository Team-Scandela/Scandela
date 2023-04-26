import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrincipalPage from './pages/Scandela'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<PrincipalPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
