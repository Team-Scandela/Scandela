import { useState, useEffect } from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import LandingPage from './pages/landingpage';
import Redirect from './pages/redirect';
import LoadingPage from './components/LoadingPage';
import Admin from './pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const initialUserInfo = {
    id: 0,
    town: '',
    email: '',
    username: '',
    password: '',
    role: '',
    moreInformations: [''],
    darkmode: false,
    lastConnexion: '',
    decisions: [''],
    isPremiumActivated: true
};

/** Route page */
const App: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const updateUserInfo = (newInfo: any) => {
        setUserInfo(prevState => ({ ...prevState, ...newInfo }));
      };

    return (
        <div>
            <Helmet>
                <title>Scandela</title>
                <meta
                    name="description"
                    content="Scandela est une application d'aide à la gestion et à la maintenance de l'éclairage public."
                />
                <meta
                    name="keywords"
                    content="Scandela, éclairage, gestion, maintenance, éclairage public, éclairage urbain, éclairage intelligent, smart city, smart lighting, aide"
                />
                <meta name="author" content="Scandela" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Helmet>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LandingPage
                                userInfo={userInfo}
                                updateUserInfo={
                                    updateUserInfo
                                }
                            />
                        }
                    />
                    <Route path="/login" element={
                        <Login
                            updateUserInfo={
                                updateUserInfo
                            }/>} />
                    <Route
                        path="/scandela"
                        element={
                            <Main userInfo={userInfo} />
                        }
                    />
                    <Route path="/redirect" element={<Redirect />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
