import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadListClientsAction} from '../actions';
import ClientListComponent from "../components/DashboardClientList";
import {getClientsList} from "../selectors";

class ClientList extends Component {
    componentDidMount() {
        this.props.loadListClientsAction();
    }

    render() {
        const {clients} = this.props;
        return (
            <ClientListComponent clients={clients} />
        );
    }
}

const mapStateToProps = (state) => ({
    clients: getClientsList(state)
});

export default connect(mapStateToProps, {loadListClientsAction})(ClientList);