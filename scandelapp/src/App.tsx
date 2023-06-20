import * as React from 'react';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import TestFilters from './pages/testFilters'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Route page */
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/testFilters' element={<TestFilters/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;