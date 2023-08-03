import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import SupplyDataEntryListItem from "./SupplyDataEntry/SupplyDataEntryListItem";
import Pagination from '../../../components/common/Pagination';

const SupplyDataEntryList = ({supplyDataEntries, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.order.Supply_Data_Entry_List" defaultMessage="Supply Data Entry List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="app.order.Company" defaultMessage="Company" /></th>
                                    <th><FormattedMessage id="app.order.Supply_Type" defaultMessage="Suppy Type" /></th>
                                    <th><FormattedMessage id="app.order.Branch_Name" defaultMessage="Branch Name" /></th>
                                    <th><FormattedMessage id="app.order.Days_Of_Operation" defaultMessage="Days Of Operation" /></th>
                                    <th><FormattedMessage id="app.order.Physical_Address" defaultMessage="Physical Address" /></th>
                                    <th><FormattedMessage id="app.order.Primary_Contact_Details" defaultMessage="Primary Contact Details" /></th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(supplyDataEntries && supplyDataEntries.length > 0)
                                    ? supplyDataEntries.map((supplyDataEntry, idx) => (
                                        <SupplyDataEntryListItem key={idx} supplyDataEntry={supplyDataEntry} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={6}><FormattedMessage id="app.order.No_Supply_Data_Entry_Found" defaultMessage="No Supply Data Entry Found" /></td></tr>
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

SupplyDataEntryList.propTypes = {
    supplyDataEntries: PropTypes.array
};

export default SupplyDataEntryList;