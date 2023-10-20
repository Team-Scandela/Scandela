import * as React from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import MainDB from './pages/maindb';
import Test from './pages/test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

/** Route page */
const App: React.FC = () => {
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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/fromdb" element={<MainDB />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
