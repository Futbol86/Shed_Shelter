import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import QuickBooksApisContainer  from './containers/QuickBooksApis';
import QuickBooksCallbackMessagesComponent  from './components/QuickBooksCallbackMessages';
import MyObApisContainer  from './containers/MyObApis';

const AccountingsRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/quickbooks-apis`} component={QuickBooksApisContainer} />
        <Route path={`${match.url}/quickbooks-apis-callback`} component={QuickBooksCallbackMessagesComponent} />

        <Route path={`${match.url}/myob-apis`} component={MyObApisContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(AccountingsRouteComponent);