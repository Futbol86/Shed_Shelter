import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";
import DashboardContainer from "./components/Dashboard";

const DashboardRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}`} component={DashboardContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(DashboardRouteComponent);