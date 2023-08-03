import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import ContructionListContainer from "./containers/ContructionList";
import ContructionAddContainer from "./containers/ContructionAdd";
import ContructionEditContainer from "./containers/ContructionEdit";

import SharedContructionListContainer from "./containers/SharedContructionList";
import SharedContructionEditContainer from "./containers/SharedContructionEdit";

import ContructionDataEntryListContainer from './containers/ContructionDataEntryList';
import ContructionDataEntryAddContainer from './containers/ContructionDataEntryAdd';
import ContructionDataEntryEditContainer from './containers/ContructionDataEntryEdit';

import ContructionPlannerContainer from "./containers/ContructionPlanner";

const ContructionsRouteComponent = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/list`} component={ContructionListContainer} />
        <Route path={`${match.url}/add/:quoteId`} component={ContructionAddContainer} />
        <Route path={`${match.url}/edit/:quoteId`} component={ContructionEditContainer} />

        <Route path={`${match.url}/contruction-data-entries/list`} component={ContructionDataEntryListContainer} />
        <Route path={`${match.url}/contruction-data-entries/add`} component={ContructionDataEntryAddContainer} />
        <Route path={`${match.url}/contruction-data-entries/edit/:contructionDataEntryId`} component={ContructionDataEntryEditContainer} />

        <Route exact path={`${match.url}/shared-contructions/list/:status`} component={SharedContructionListContainer} />
        <Route path={`${match.url}/shared-contructions/edit/:quoteId`} component={SharedContructionEditContainer} />

        <Route exact path={`${match.url}/contruction-planners`} component={ContructionPlannerContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(ContructionsRouteComponent);