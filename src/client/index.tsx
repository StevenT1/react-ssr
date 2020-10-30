import React from 'react';
import ReactDom from 'react-dom';
import App from '../shared/app';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import { createClientStore } from '../shared/store';
import { Provider } from 'react-redux';
ReactDom.render(
    <Provider store={createClientStore()}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);