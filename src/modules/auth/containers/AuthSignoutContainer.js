import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

import {logoutAction} from '../actions';

class SignoutFormContainer extends Component{
    componentWillMount() {
        this.props.logoutAction();
    }

    componentDidMount() {
        this.props.history.push('/auth/login');
    }

    componentWillUnmount() {
        this.props.history.push('/auth/login');
    }

    render() {
        return (
            <div>
                Logging out ...
            </div>
        );
    }
}

SignoutFormContainer.propTypes = {
    logoutAction: PropTypes.func.isRequired
};

export default withRouter(connect(null, {logoutAction})(SignoutFormContainer));
