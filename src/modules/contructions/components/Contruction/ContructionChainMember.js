import React, {Component} from 'react';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-modal';
import {FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import ContructionChainMemberInfoModal from "./ContructionChainMemberInfoModal";

class ContructionChainMember extends Component {
    render() {
        const {contructionDetails, selectedContructionMemberId, uploadRootURL, currentModalId, handleModalChange, handleModalClose} = this.props;

        const allContructionDataEntries = this.props.contructionDataEntries && this.props.contructionDataEntries.length ?
            this.props.contructionDataEntries.map(contrucionDataEntry => {
            return {
                label: contrucionDataEntry.tradesRegisteredName,
                value: contrucionDataEntry.id + ''
            }
        }) : [];

        return (
            <Card>
                <CardHeader>
                    <b><FormattedMessage id="app.contruction.Contruction_Chain_Members" defaultMessage="Contruction Chain Members" /></b>
                    <div className="card-actions">
                    <a href="#" onClick={() => handleModalChange(1-currentModalId)}>
                        <i className="icon-info" title="View contruction chain member info" />
                    </a>

                    <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                        isOpen={currentModalId === 1}
                        contentLabel="Contruction chain member info"
                        style={{content: {outline: 0}}}
                    >
                        <ContructionChainMemberInfoModal allContructionDataEntries={this.props.contructionDataEntries}
                            selectedContructionMemberId={selectedContructionMemberId}
                            uploadRootURL={uploadRootURL}
                            handleModalClose={handleModalClose}
                        />
                    </Modal>
                </div>
                </CardHeader>
                <CardBody>
                    <Row style={{pointerEvents: `${contructionDetails && contructionDetails.id ? 'none' : ''}`}}>
                        <Col xs="12" md="12">
                            <Row>
                                <Col xs="5">
                                    <FormattedMessage id="app.contruction.Contruction_Members" defaultMessage="Contruction Members"/>
                                    {' '}<span className="text-red">(*)</span>
                                </Col>
                                <Col xs="7">
                                    <Field
                                        multi={true}
                                        name="contructionMembers"
                                        options={allContructionDataEntries}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );                      
    }
}

export default ContructionChainMember;