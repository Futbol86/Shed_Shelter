import React from 'react';
import {Route, Switch} from 'react-router';
import {UserIsAuthenticated} from "../../routes";
import MasterReportingContainer from './containers/MasterReporting';
// import Reporting from "./containers/Reporting";

import NotFound from "../../components/common/NotFound";

const ReportingRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}`} component={MasterReportingContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(ReportingRouteComponent);