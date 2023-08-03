import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import ContructionListFilter from '../containers/ContructionListFilter';
import ContructionListItem from "./Contruction/ContructionListItem";
import Pagination from '../../../components/common/Pagination';

const ContructionList = ({contructions, pagination, onChangePage, handleOpenOrCloseClick, handleDeleteClick}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.contruction.Contruction_List" defaultMessage="Contruction List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <ContructionListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="app.contruction.Quote_ID" defaultMessage="Quote ID" /></th>
                                    <th><FormattedMessage id="app.contruction.Job_Number" defaultMessage="Job Number" /></th>
                                    <th><FormattedMessage id="app.contruction.Client_Name" defaultMessage="Client Name" /></th>
                                    <th><FormattedMessage id="app.contruction.Dealer_Name" defaultMessage="Dealer Name" /></th>
                                    <th><FormattedMessage id="app.contruction.Status" defaultMessage="Status" /></th>
                                    <th><FormattedMessage id="app.contruction.Invited_Members" defaultMessage="Invited Members" /></th>
                                    <th><FormattedMessage id="app.contruction.Accepted" defaultMessage="Accepted" /></th>
                                    <th><FormattedMessage id="app.contruction.Rejected" defaultMessage="Rejected" /></th>
                                    <th><FormattedMessage id="app.contruction.Created_Date" defaultMessage="Created Date" /></th>
                                    <th><FormattedMessage id="app.contruction.Updated_Date" defaultMessage="Updated Date" /></th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(contructions && contructions.length > 0)
                                    ? contructions.map((contruction, idx) => (
                                        <ContructionListItem key={idx} contruction={contruction}
                                            handleOpenOrCloseClick={handleOpenOrCloseClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    ))
                                    : <tr><td colSpan={11}><FormattedMessage id="app.contruction.No_Contruction_Found" defaultMessage="No Contruction Found" /></td></tr>
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

ContructionList.propTypes = {
    contructions: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired
};

export default ContructionList;