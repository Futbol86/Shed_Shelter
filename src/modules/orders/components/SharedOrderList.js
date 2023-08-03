import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import SharedOrderListFilter from '../containers/SharedOrderListFilter';
import SharedOrderListItem from "./SharedOrder/SharedOrderListItem";
import Pagination from '../../../components/common/Pagination';

const SharedOrderList = ({supplyDataEntries, orders, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.order.Shared_Order_List" defaultMessage="Shared Order List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <SharedOrderListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                <th><FormattedMessage id="app.order.ID" defaultMessage="ID" /></th>
                                    <th><FormattedMessage id="app.order.Job_Number" defaultMessage="Job Number" /></th>
                                    <th><FormattedMessage id="app.order.Client_Name" defaultMessage="Client Name" /></th>
                                    <th><FormattedMessage id="app.order.Status" defaultMessage="Status" /></th>
                                    <th><FormattedMessage id="app.order.Roll_Form" defaultMessage="Roll Form" /></th>
                                    <th><FormattedMessage id="app.order.Supplier" defaultMessage="Supplier" /></th>
                                    <th><FormattedMessage id="app.order.Created_Date" defaultMessage="Created Date" /></th>
                                    <th><FormattedMessage id="app.order.Updated_Date" defaultMessage="Updated Date" /></th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(orders && orders.length > 0)
                                    ? orders.map((order, idx) => (
                                        <SharedOrderListItem key={idx} supplyDataEntries={supplyDataEntries} order={order} />
                                    ))
                                    : <tr><td colSpan={8}><FormattedMessage id="app.order.No_Order_Found" defaultMessage="No Order Found" /></td></tr>
                                }
                            </tbody>
                        </Table>

                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

SharedOrderList.propTypes = {
    orders: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired
};

export default SharedOrderList;