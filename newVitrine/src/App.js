import { useState } from 'react';
import Menubar from './components/menubar';
import Home from './page/home';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <div>
            <Menubar />
            {currentPage === 'home' && <Home />}
        </div>
    );
}

export default App;