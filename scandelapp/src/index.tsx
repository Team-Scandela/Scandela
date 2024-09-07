import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css';

/** Render the react application */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
