import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import auth from "../../../services/auth";
import {RP_changeReportTab} from '../actions';
import {getReportTabIndex} from "../selectors";
import MasterReportingComponent from "../components/MasterReporting";

class MasterReporting extends Component {
    handleTabChange = (tabIndex) => {
        this.props.RP_changeReportTab(tabIndex);
    }

    render() {
        const isAnAdmin = auth.isAnAdmin();

        return (
            <MasterReportingComponent {...this.props} isAnAdmin={isAnAdmin} handleTabChange={this.handleTabChange}/>
        );
    }
}

const mapStateToProps = (state) => ({
    tabIndex:           getReportTabIndex(state),
});

const mapDispatchToProps = (dispatch) => ({ 
    RP_changeReportTab: payload => dispatch(RP_changeReportTab(payload)), 
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MasterReporting));