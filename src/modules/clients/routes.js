import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";
import ClientListContainer from "./containers/ClientList";
import ClientAddContainer from "./containers/ClientAdd";
import ClientDetailContainer from './containers/ClientDetail';
import ClientEditContainer from "./containers/ClientEdit";

const ClientsRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/add`} component={ClientAddContainer} />
        <Route exact path={`${match.url}/list`} component={ClientListContainer} />
        <Route path={`${match.url}/edit/:clientId`} component={ClientEditContainer} />
        <Route path={`${match.url}/:clientId`} component={ClientDetailContainer} />
        <Route path={`${match.url}`} component={ClientListContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(ClientsRouteComponent);