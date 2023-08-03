import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import ContructionDataEntryListItem from "./ContructionDataEntry/ContructionDataEntryListItem";
import Pagination from '../../../components/common/Pagination';

const ContructionDataEntryList = ({contructionDataEntries, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.contruction.Contruction_Data_Entry_List" defaultMessage="Contruction Data Entry List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="app.contruction.Trades_Registered_Name" defaultMessage="Trades Registered Name" /></th>
                                    <th><FormattedMessage id="app.contruction.Contruction_Field" defaultMessage="Contruction Field" /></th>
                                    <th><FormattedMessage id="app.contruction.Category" defaultMessage="Category" /></th>
                                    <th><FormattedMessage id="app.contruction.Contractors_Licence_Number" defaultMessage="Contractors Licence Number" /></th>
                                    <th><FormattedMessage id="app.contruction.Contractors_Licence_Expiry_Date" defaultMessage="Contractors Licence Expiry Date" /></th>
                                    <th><FormattedMessage id="app.contruction.Australian_Business_Number" defaultMessage="Australian Business Number" /></th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(contructionDataEntries && contructionDataEntries.length > 0)
                                    ? contructionDataEntries.map((contructionDataEntry, idx) => (
                                        <ContructionDataEntryListItem key={idx} contructionDataEntry={contructionDataEntry} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={7}><FormattedMessage id="app.contruction.No_Contruction_Data_Entry_Found" defaultMessage="No Contruction Data Entry Found" /></td></tr>
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

ContructionDataEntryList.propTypes = {
    contructionDataEntries: PropTypes.array
};

export default ContructionDataEntryList;