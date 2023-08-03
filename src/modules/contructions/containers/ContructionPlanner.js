import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {loadListContructionPlanner} from '../actions';
import {getUserId} from "../../users/selectors";
import {getContructionPlannerList} from "../selectors";
import ContructionPlannerComponent from "../components/ContructionPlanner";

class ContructionPlanner extends Component {
    componentWillMount() {
        const { userId } = this.props;
        let payload = {};
        payload.filter = `&userId=${userId}`;

        this.props.loadListContructionPlanner(payload);
    }

    render() {
        return (
            <ContructionPlannerComponent {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    userId:              getUserId(state),
    contructionPlanners: getContructionPlannerList(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListContructionPlanner: payload => dispatch(loadListContructionPlanner(payload)), 
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContructionPlanner));