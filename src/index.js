import 'url-search-params-polyfill';
import 'core-js/es6/array';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
//-- TODO: REPLACE WITH connected-react-router
// import {ConnectedRouter} from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router';
import {IntlProvider} from 'react-intl';
import Modal from 'react-modal';

import store, {history} from './store';
import App from './App';
import {enabledModules} from './config';

// import registerServiceWorker from './registerServiceWorker';

/**
 * Common Styles for the application
 */
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './styles/css/style.css';
import './styles/css/dropdown-menu-right.css';

import {localeToUse, loadLocaleMessages} from './locales';

Modal.setAppElement('#root');

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={localeToUse} messages={loadLocaleMessages(enabledModules)}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);
//registerServiceWorker();
