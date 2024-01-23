import { useState } from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import LandingPage from './pages/landingpage';
import Redirect from './pages/redirect';
import MainDB from './pages/maindb';
import Test from './pages/test';
import Admin from './pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { Helmet } from 'react-helmet';

/** Route page */
const App: React.FC = () => {
    const [isPremiumActivated, setIsPremiumActivated] = useState<boolean>(true);

    const handleToggleIsPremiumActivated = () => {
        setIsPremiumActivated((prevState) => !prevState);
    };

    Sentry.init({
        dsn: 'https://b7ba74511176b52c96d1d58dc76d7ab7@o4505907192725504.ingest.sentry.io/4505907207012352',
        integrations: [
            new Sentry.BrowserTracing({
                tracePropagationTargets: [
                    'localhost',
                    /^https:\/\/app.scandela.fr/,
                ],
            }),
        ],
        tracesSampleRate: 1.0,
        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });

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
                                isPremiumActivated={isPremiumActivated}
                                handleToggleIsPremiumActivated={
                                    handleToggleIsPremiumActivated
                                }
                            />
                        }
                    />
                    <Route
                        path="/fromdb"
                        element={
                            <MainDB isPremiumActivated={isPremiumActivated} />
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/scandela"
                        element={
                            <Main isPremiumActivated={isPremiumActivated} />
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
