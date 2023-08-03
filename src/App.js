import React, {Component} from 'react';

import RootRoute from "./routes";
import store from "./store";
import {loginAction} from "./modules/auth/actions";
import {auth} from "./services";

import ModalsContainer from './components/common/ModalsContainer';

class App extends Component {
    componentWillMount() {
        //-- TODO: Other pre-load things (if needed)

        //-- Auto logging in if the auth-token is saved in the local storage
        if (auth.loggedIn()) {
            store.dispatch(loginAction());
        }
    }
    render() {
        return (
            <React.Fragment>
                <RootRoute />
                <ModalsContainer />
            </React.Fragment>
        );
    }
}

export default App;
