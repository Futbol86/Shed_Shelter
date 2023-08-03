import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";
import ProfileContainer from "./containers/ProfileContainer";
import ProfileChangeAvatar from "./containers/ProfileChangeAvatar";

const UsersRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/profile-avatar`} component={ProfileChangeAvatar} />
        <Route path={`${match.url}/profile`} component={ProfileContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(UsersRouteComponent);