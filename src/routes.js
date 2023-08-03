import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connectedRouterRedirect, connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
// import { routerActions } from 'react-router-redux';
import { routerActions } from 'connected-react-router';

import {enabledModules} from './config';

import DefaultLayout from "./layout/Default";
import BlankLayout from "./layout/Blank";
import NotFound from "./components/common/NotFound";
import {isLoggedIn, isLoggingIn, isNotLoggedIn} from './modules/auth/selectors';

import Dashboard from './modules/dashboard/components/Dashboard';

//-- In react-router-v4 you don't nest <Routes />. Instead, you put them inside another <Component />.

const DefaultLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <DefaultLayout {...rest}>
                <Component {...matchProps} />
            </DefaultLayout>
        )} />
    )
};

//-- We use Blank layout for Auth-related Components: Login, Logout, Forgot Password, etc.
const BlankLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <BlankLayout {...rest}>
                <Component {...matchProps} />
            </BlankLayout>
        )} />
    )
};

export const DefaultRoute = DefaultLayoutRoute;

//-- Check if user is authenticated
export const UserIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/auth/login',
    // authenticatedSelector: state => (state.auth.isSignedIn !== null && state.auth.isSignedIn !== false),
    authenticatedSelector: isLoggedIn,
    authenticatingSelector: isLoggingIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectAction: routerActions.replace,  // This should be a redux action creator
});

//-- Check if user is not authenticated
const locationHelper = locationHelperBuilder({});
export const UserIsNotAuthenticated = connectedRouterRedirect({
    // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
    allowRedirectBack: false,   // This prevents us from adding the query parameter when we send the user away from the login page
    authenticatingSelector: isLoggingIn,
    authenticatedSelector: isNotLoggedIn,  // If selector is true, wrapper will not redirect
    wrapperDisplayName: 'UserIsNotAuthenticated'
});

//-- Check if user is an Admin
export const UserIsAdmin = connectedReduxRedirect({
    redirectPath: '/dashboard',
    authenticatedSelector: state => (state.user !== null && state.user.detail && state.user.detail.roles.includes('admin')),
    redirectAction: (newLoc) => (dispatch) => {
        dispatch(routerActions.replace(newLoc));
        // dispatch(addNotification({ message: 'Sorry, you are not an administrator' }));
    },
    wrapperDisplayName: 'UserIsAdmin'
});

const RootRoute = () => (
    <Switch>
        <Route exact path="/">
            <Redirect to="/dashboard" />
        </Route>
        {enabledModules && enabledModules.map(modPath => {
            var ModRouteComponent = require(`./modules/${modPath}/routes`).default;
            if (modPath === 'auth')
                return (
                    <BlankLayoutRoute key={modPath} path={`/${modPath}`} component={ModRouteComponent} />
                );
            else
                return (
                    <DefaultRoute key={modPath} path={`/${modPath}`} component={ModRouteComponent} />
                );
        })}
        <DefaultLayoutRoute exact path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="*" component={NotFound}/>
    </Switch>
);

export default RootRoute;