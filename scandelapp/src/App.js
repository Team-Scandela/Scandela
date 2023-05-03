import './App.css';
import Main from './pages/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Route page */
function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Main/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;