import Home from './pages/home';
import About from './pages/about';
import Us from './pages/us';
import Offers from './pages/offers';
import Tools from './pages/tools';

import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/us' element={<Us />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/tools' element={<Tools />} />
        </Routes>
    </BrowserRouter>
    );
}

export default App;