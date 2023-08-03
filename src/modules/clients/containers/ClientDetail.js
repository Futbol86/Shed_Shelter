import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import {getAClientInfo} from '../actions';
import ClientDetailComponent from "../components/ClientDetail";
import {getClientInfo} from '../selectors';

class ClientDetail extends Component {
    componentDidMount() {
        let {clientId} = this.props.match.params;
        if (!clientId)
            clientId = 1;
        this.props.getAClientInfo({id: clientId});
    }

    render() {
        const {client, loading} = this.props;
        return (
            <ClientDetailComponent client={client} loading={loading} />
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.clients.clientDetail.loading,
    client: getClientInfo(state)
});

export default withRouter(connect(mapStateToProps, {getAClientInfo})(ClientDetail));