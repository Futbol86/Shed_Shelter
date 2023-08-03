import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import SharedContructionListFilter from '../containers/SharedContructionListFilter';
import SharedContructionListItem from "./SharedContruction/SharedContructionListItem";
import Pagination from '../../../components/common/Pagination';

const SharedContructionList = ({contructionDataEntries, contructions, userId, status, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.contruction.Shared_Contruction_List" defaultMessage="Shared Contruction List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <SharedContructionListFilter userId={userId} status={status}/>
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="app.contruction.Quote_ID" defaultMessage="Quote ID" /></th>
                                    <th><FormattedMessage id="app.contruction.Job_Number" defaultMessage="Job Number" /></th>
                                    <th><FormattedMessage id="app.contruction.Client_Name" defaultMessage="Client Name" /></th>
                                    <th><FormattedMessage id="app.contruction.Status" defaultMessage="Status" /></th>
                                    <th><FormattedMessage id="app.contruction.Members" defaultMessage="Members" /></th>
                                    <th><FormattedMessage id="app.contruction.Created_Date" defaultMessage="Created Date" /></th>
                                    <th><FormattedMessage id="app.contruction.Updated_Date" defaultMessage="Updated Date" /></th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(contructions && contructions.length > 0)
                                    ? contructions.map((contruction, idx) => (
                                        <SharedContructionListItem key={idx} contructionDataEntries={contructionDataEntries} contruction={contruction} />
                                    ))
                                    : <tr><td colSpan={8}><FormattedMessage id="app.contruction.No_Contruction_Found" defaultMessage="No Contruction Found" /></td></tr>
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

SharedContructionList.propTypes = {
    contructions: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired
};

export default SharedContructionList;