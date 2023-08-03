import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import OrderListFilter from '../containers/OrderListFilter';
import OrderListItem from "./Order/OrderListItem";
import Pagination from '../../../components/common/Pagination';

const OrderList = ({orders, pagination, onChangePage, handleOpenOrCloseClick, handleDeleteClick}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.order.Order_List" defaultMessage="Order List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <OrderListFilter />
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
                                    <th><FormattedMessage id="app.order.Accepted" defaultMessage="Accepted" /></th>
                                    <th><FormattedMessage id="app.order.Rejected" defaultMessage="Rejected" /></th>
                                    <th><FormattedMessage id="app.order.Created_Date" defaultMessage="Created Date" /></th>
                                    <th><FormattedMessage id="app.order.Updated_Date" defaultMessage="Updated Date" /></th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(orders && orders.length > 0)
                                    ? orders.map((order, idx) => (
                                        <OrderListItem key={idx} order={order}
                                            handleOpenOrCloseClick={handleOpenOrCloseClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    ))
                                    : <tr><td colSpan={11}><FormattedMessage id="app.order.No_Order_Found" defaultMessage="No Order Found" /></td></tr>
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

OrderList.propTypes = {
    orders: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired
};

export default OrderList;