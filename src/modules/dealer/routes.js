import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import UsersRoles from "./users/routes";

const AdminRouteComponent = ({ match }) => {
    return (
        <Switch>
            {UsersRoles({match})}

            <Route path="*" component={NotFound}/>
        </Switch>
    )
};

export default UserIsAuthenticated(AdminRouteComponent);