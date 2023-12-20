import * as React from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Redirect from './pages/redirect';
import MainDB from './pages/maindb';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';

/** Route page */
const App: React.FC = () => {
    const [testIsLoading, setTestIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setTestIsLoading(false);
        }, 7000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <LoadingPage isLoading={testIsLoading} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/fromdb" element={<MainDB />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/redirect" element={<Redirect />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
