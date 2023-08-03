import React from 'react';
import {NavLink} from 'react-router-dom';
import { Table, Card, CardHeader, CardBody } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import QuoteListItem from "../../quotes/components/QuoteListItem";

const DashboardQuoteList = ({quotes, isDealer, isAnAccounting, displayClient, handleLockClick, handleUnlockClick, handleDeleteClick}) => (
    <Card>
        <CardHeader>
            <h5 className="m-0">
                <i className="icon-list" /> {' '}
                <FormattedMessage id="app.dashboard.Latest_Quotes" defaultMessage="Latest Quotes" />
            </h5>
            <div className="card-actions">
                <NavLink to={`/quotes/list`}>
                    <small className="text-muted">
                        <FormattedMessage id="app.More" defaultMessage="More" />
                    </small>
                </NavLink>
            </div>
        </CardHeader>
        <CardBody>
            <Table responsive striped>
                <thead>
                <tr>
                    <th>
                        <FormattedMessage id="app.ID" defaultMessage='ID' />
                    </th>
                    <th>
                        <FormattedMessage id="app.quotes.Status" defaultMessage='Status' />
                    </th>
                    <th></th>
                    <th>
                        <FormattedMessage id="app.quotes.Job_Number" defaultMessage='Job #' />
                    </th>
                    {displayClient &&
                        <th>
                            <FormattedMessage id="app.quotes.Client" defaultMessage='Client' />
                        </th>
                    }
                    <th>
                        <FormattedMessage id="app.quotes.Created_Date" defaultMessage='Created Date' />
                    </th>
                    <th>
                        <FormattedMessage id="app.quotes.Updated_Date" defaultMessage='Update_Date' />
                    </th>
                    {isDealer &&
                    <th>
                        <FormattedMessage id="app.quotes.Created_by" defaultMessage='Created by' />
                    </th>
                    }
                    <th>
                        <FormattedMessage id="app.quotes.Description" defaultMessage='Description' />
                    </th>
                    <th>
                        <span className="pull-right">
                            <FormattedMessage id="app.quotes.Value" defaultMessage='Value' />
                        </span>
                    </th>
                    <th align="center"></th>
                </tr>
                </thead>
                <tbody>
                {(quotes && quotes.length > 0)
                    ? quotes.map((quote, idx) => (
                        <QuoteListItem key={idx} quote={quote} isDealer={isDealer} isAnAccounting={isAnAccounting}
                                       displayClient = {displayClient}
                                       handleDeleteClick={handleDeleteClick}
                                       handleLockClick={handleLockClick}
                                       handleUnlockClick={handleUnlockClick}
                        />
                    ))
                    : <tr><td colSpan={5}><FormattedMessage id="app.quotes.No_Quote_Found" defaultMessage='No Quote Found' /></td></tr>
                }
                </tbody>
            </Table>
        </CardBody>
    </Card>
);

export default DashboardQuoteList;