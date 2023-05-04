import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Route page */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Main/>}/>
                <Route exact path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;