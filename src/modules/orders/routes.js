import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import OrderListContainer from "./containers/OrderList";
import OrderAddContainer from "./containers/OrderAdd";
import OrderEditContainer from "./containers/OrderEdit";

import SharedOrderListContainer from "./containers/SharedOrderList";
import SharedOrderEditContainer from "./containers/SharedOrderEdit";

import SupplyDataEntryListContainer from './containers/SupplyDataEntryList';
import SupplyDataEntryAddContainer from './containers/SupplyDataEntryAdd';
import SupplyDataEntryEditContainer from './containers/SupplyDataEntryEdit';

const OrdersRouteComponent = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/list`} component={OrderListContainer} />
        <Route path={`${match.url}/add/:quoteId`} component={OrderAddContainer} />
        <Route path={`${match.url}/edit/:quoteId`} component={OrderEditContainer} />

        <Route path={`${match.url}/supply-data-entries/list`} component={SupplyDataEntryListContainer} />
        <Route path={`${match.url}/supply-data-entries/add`} component={SupplyDataEntryAddContainer} />
        <Route path={`${match.url}/supply-data-entries/edit/:supplyDataEntryId`} component={SupplyDataEntryEditContainer} />

        <Route exact path={`${match.url}/shared-orders/list/:status`} component={SharedOrderListContainer} />
        <Route path={`${match.url}/shared-orders/edit/:quoteId`} component={SharedOrderEditContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(OrdersRouteComponent);