import React from 'react';
import {Route, Switch} from 'react-router';

import AuthSigninContainer from './containers/AuthSigninContainer';
import AuthSignoutContainer from './containers/AuthSignoutContainer';
import NotFound from "../../components/common/NotFound";
import {UserIsNotAuthenticated} from "../../routes";
import ForgotPasswordFormContainer from "./containers/ForgotPasswordFormContainer";
import PasswordResetContainer from "./containers/PasswordResetContainer";

const AuthRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/login`} component={UserIsNotAuthenticated(AuthSigninContainer)} />
        <Route path={`${match.url}/logout`} component={AuthSignoutContainer} />
        <Route path={`${match.url}/forgot-password`} component={ForgotPasswordFormContainer} />
        <Route path={`${match.url}/password-reset/:token`} component={PasswordResetContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default AuthRouteComponent;