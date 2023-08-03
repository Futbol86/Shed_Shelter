import React from 'react';
import {Route} from 'react-router';

import UserListContainer from "./containers/UserList";
import {MODULE_SUB_ID_USERS} from "../constants";

const UsersRouteComponent = ({ match }) => {
    return (
        <React.Fragment>
            <Route exact path={`${match.url}/${MODULE_SUB_ID_USERS}/list`}  component={UserListContainer} />
            <Route exact path={`${match.url}/${MODULE_SUB_ID_USERS}`}       component={UserListContainer} />
        </React.Fragment>
    );
};
export default UsersRouteComponent;