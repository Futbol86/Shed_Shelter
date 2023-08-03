import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import JobTracking from "./containers/JobTracking";
import {MODULE_SUB_ID_JOB_TRACKING} from "./constants";

import NotFound from "../../components/common/NotFound";

const PaymentAndJobTrackerRouteComponent = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/${MODULE_SUB_ID_JOB_TRACKING}`}>
                <Redirect to="/quotes/list?status=S" />
            </Route>
            <Route exact path={`${match.url}/${MODULE_SUB_ID_JOB_TRACKING}/:quoteId`} component={JobTracking} />
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}

export default PaymentAndJobTrackerRouteComponent;