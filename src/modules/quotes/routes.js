import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";
import QuoteListContainer from "./containers/QuoteList";
import QuoteAttachedNoteAndTextListContainer from "./containers/QuoteAttachedNoteAndTextList";
import QuoteAddContainer from "./containers/QuoteAdd";
import QuoteEdit from "./containers/QuoteEdit";

const QuotesRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/add/:clientId?`} component={QuoteAddContainer} />
        <Route path={`${match.url}/edit/:quoteId`} component={QuoteEdit} />
        <Route path={`${match.url}/list`} component={QuoteListContainer} />
        <Route path={`${match.url}/note-and-text/list`} component={QuoteAttachedNoteAndTextListContainer} />
        <Route path={`${match.url}`} component={QuoteListContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(QuotesRouteComponent);