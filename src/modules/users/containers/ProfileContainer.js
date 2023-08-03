import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadProfileAction} from '../actions';
import ProfileComponent from "../components/ProfileComponent";
import {getUserId} from "../selectors";

class ProfileContainer extends Component {
    componentDidMount() {
        const {userId} = this.props;
        if ( (userId) ) {
            this.props.loadProfileAction({id: userId});
        }
    }

    componentDidUpdate(prevProps) {
        const {userId} = this.props;
        if ( (userId) && (!prevProps || (prevProps && !prevProps.userId)) ) {
            this.props.loadProfileAction({id: userId});
        }
    }

    render() {
        return (
            <ProfileComponent userId={this.props.userId} />
        );
    }
}

const mapStateToPros = (state) => ({
    userId: getUserId(state)
});

export default (connect(mapStateToPros, {loadProfileAction})(ProfileContainer));