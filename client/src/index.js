import './style/reset.scss';
import './style/style.scss';

import React from 'react';
import App from './components/App/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
