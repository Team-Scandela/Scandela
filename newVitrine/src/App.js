import Home from './pages/home';
import About from './pages/about';
import Offers from './pages/offers';
import Features from './pages/features';
import Contact from './pages/contact';

import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/features" element={<Features />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
