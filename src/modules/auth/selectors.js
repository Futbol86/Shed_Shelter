import {createSelector} from 'reselect';

const isLoggedInFunc = (state) => state.auth.isSignedIn;
const isLoggingInFunc = (state) => state.auth.loading;

export const isLoggedIn = createSelector(
    isLoggedInFunc,
    (loggedIn) => loggedIn
);

export const isNotLoggedIn = createSelector(
    isLoggedInFunc,
    (loggedIn) => !loggedIn
);

export const isLoggingIn = createSelector(
    isLoggingInFunc,
    (loggingIn) => loggingIn
);