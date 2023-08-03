import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import Drawing3DContainer  from './containers/Drawing3D';
import Drawing3DLibrariesContainer  from './containers/Drawing3DLibraries';

const Drawing3DRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/main`} component={Drawing3DContainer} />
        <Route path={`${match.url}/libraries`} component={Drawing3DLibrariesContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(Drawing3DRouteComponent);