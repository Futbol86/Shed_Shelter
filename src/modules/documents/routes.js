import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";
import QuotePrinter from "./containers/QuotePrinter";
import Accounting from "./containers/Accounting";

const DocumentsRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/quote-printer/:quoteId`} component={QuotePrinter} />
        <Route path={`${match.url}/accounting/:quoteId`} component={Accounting} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(DocumentsRouteComponent);