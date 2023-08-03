import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, Badge, Label } from 'reactstrap';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import Pagination from '../../../../components/common/Pagination/index';
import {NavLink} from "react-router-dom";

const UsersList = ({users, currentUserId, pagination, onChangePage}) => {
    const mappingMarginLabels = {
        0: "< $5K",
        5000: "$5K-$10K",
        10000: "$10K-$50K",
        50000: "> $50K"
    };
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>
                        <FormattedMessage id="app.dealer.User_List" defaultMessage="User List" />
                    </h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div className="float-right mb-2">
                            </div>
                            <Table responsive striped>
                                <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id="app.dealer.User_Info" defaultMessage="User Info" />
                                    </th>
                                    <th className="text-right">
                                        <FormattedMessage id="app.users.Wholesale_Margin" defaultMessage="Wholesale Margin" />
                                    </th>
                                    <th className="text-right">
                                        <FormattedMessage id="app.users.Retail_Margin" defaultMessage="Retail Margin" />
                                    </th>
                                    <th className="d-flex flex-column">
                                        <div className="font-weight-bold text-center">
                                            <FormattedMessage id="app.dealer.Value_of_Work" defaultMessage="Value of Work" />
                                        </div>
                                        <div className="d-flex flex-row justify-content-between">
                                            <div style={{fontSize: "smaller"}} className="flex-fill text-right">
                                                <FormattedMessage id="app.dealer.Wholesale_Quotes" defaultMessage="Wholesale Quotes" />
                                            </div>
                                            <div style={{fontSize: "smaller"}} className="flex-fill text-right">
                                                <FormattedMessage id="app.dealer.Retail_Quotes" defaultMessage="Retail Quotes" />
                                            </div>
                                            <div style={{fontSize: "smaller"}} className="flex-fill text-right">
                                                <FormattedMessage id="app.dealer.Wholesale_Orders" defaultMessage="Wholesale Orders" />
                                            </div>
                                            <div style={{fontSize: "smaller"}} className="flex-fill text-right">
                                                <FormattedMessage id="app.dealer.Retail_Orders" defaultMessage="Retail Orders" />
                                            </div>
                                        </div>
                                    </th>
                                    <th align="center"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {(users && users.length > 0)
                                    ? users.map((user, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div className={user.active ? 'font-weight-bold' : 'text-gray-400'}>
                                                    {`${user.firstName} ${user.lastName}`}
                                                </div>
                                                <div className="d-flex flex-row">
                                                    {user.roles && user.roles.split(',').map((item, idx) =>
                                                        <React.Fragment key={idx}>
                                                            <Badge color={(item === 'admin') ? 'primary' : ((item === 'dealer') ? 'success' : 'info')}
                                                                   className="mr-1"
                                                            >
                                                                {item}
                                                            </Badge>
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                                <div>
                                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                                </div>
                                                <div className="d-flex flex-row justify-content-between">
                                                    {user.phone &&
                                                        <div className="flex-fill d-flex flex-row">
                                                            <i className="fas pf-char fa-fw" data-char-content="M"></i>
                                                            <span className="pr-1">:</span>
                                                            {user.phone}
                                                        </div>
                                                    }
                                                    {user.phoneWork &&
                                                        <div className="flex-fill d-flex flex-row">
                                                            <i className="fas pf-char fa-fw pr-1" data-char-content="W"></i>
                                                            <span className="pr-1">:</span>
                                                            {user.phoneWork}
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                {user.wholesaleMargin && Object.keys(user.wholesaleMargin).map((mKey, idx) => {
                                                    const keyNum = String(mKey).replace(/'|'/gi,"");
                                                    return <div key={idx} className="d-flex flex-row justify-content-end">
                                                        <span>{ mappingMarginLabels[keyNum] }: </span>
                                                        <span className="pl-1">{ user.wholesaleMargin[mKey] }%</span>
                                                    </div>
                                                })}
                                            </td>
                                            <td className="text-right">
                                                <Label>
                                                    {(user.dealer && user.dealer.retailMargin) ? user.dealer.retailMargin : '0'}%
                                                </Label>
                                            </td>

                                            <td>
                                                <table width="100%" border="0">
                                                    <tbody>
                                                        <tr style={{background: 'none'}}>
                                                            <td width="25%" style={{border: 'none', textAlign: 'right'}}>
                                                                <FormattedNumber value={user.valueWQuotes} style='currency' currency='USD'
                                                                                minimumFractionDigits={0} maximumFractionDigits={0}
                                                                />
                                                            </td>
                                                            <td width="25%" style={{border: 'none', textAlign: 'right'}}>
                                                                <FormattedNumber value={user.valueRQuotes} style='currency' currency='USD'
                                                                                minimumFractionDigits={0} maximumFractionDigits={0}
                                                                />
                                                            </td>
                                                            <td width="25%" style={{border: 'none', textAlign: 'right'}}>
                                                                <FormattedNumber value={user.valueWOrders} style='currency' currency='USD'
                                                                                minimumFractionDigits={0} maximumFractionDigits={0}
                                                                />
                                                            </td>
                                                            <td width="25%" style={{border: 'none', textAlign: 'right'}}>
                                                                <FormattedNumber value={user.valueROrders} style='currency' currency='USD'
                                                                                minimumFractionDigits={0} maximumFractionDigits={0}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </td>


                                            <td align="center">
                                                {' '}
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan={5}><FormattedMessage id="app.dealer.No_User_Found" defaultMessage="No User Found!" /></td></tr>
                                }
                                </tbody>
                            </Table>

                            {/*TO DO*/}
                            <Pagination pagination={pagination} onChangePage={onChangePage} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

UsersList.propTypes = {
    users: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired
};

export default UsersList;