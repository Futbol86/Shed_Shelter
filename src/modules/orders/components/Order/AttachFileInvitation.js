import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {isEmpty, union} from 'lodash';
import {Field, FieldArray, change, Form} from 'redux-form';
import {Row, Col, Label, Card, CardHeader, CardBody, FormGroup} from 'reactstrap';
import {FieldAutoComplete, FieldDropZone, FieldLevelValidation} from "../../../../components/common/Form/index";

class AttachFileInvitation extends Component {
    render() {
        const { orderDetails, staticFileUrl, attachFiles, isLocked, handleFileDrops, handleDeleteFile } = this.props;
        const allRollForms = orderDetails && orderDetails.rollForms && orderDetails.rollForms.length ?
            orderDetails.rollForms.map(rollFormId => {
                let rollForm = this.props.allRollForms.find(p => p.id === parseInt(rollFormId));
                if(rollForm) {
                    return {
                        label: rollForm.company,
                        value: rollForm.id + ''
                    }
                }
            }) : [];

        const allSuppliers = orderDetails && orderDetails.suppliers && orderDetails.suppliers.length ?
            orderDetails.suppliers.map(supplierId => {
                let supplier = this.props.allSuppliers.find(p => p.id === parseInt(supplierId));
                if(supplier) {
                    return {
                        label: supplier.company,
                        value: supplier.id + ''
                    }
                }
            }) : [];

        const allAttachFiles = attachFiles && attachFiles.length ?
            this.props.attachFiles.map(attachFile => {
                return {
                    label: attachFile && attachFile.substring(10),
                    value: attachFile
                }
            }) : [];

        const allMembers = union(allRollForms, allSuppliers);

        const renderAttachFiles = ({ fields, meta: { touched, error, submitFailed } }) => {
            return  <React.Fragment>
                        {fields && fields.map((member, index) => (
                            <Row key={index} className="mb-3 d-flex flex-row justify-content-between align-items-center"
                                style={{pointerEvents: `${isLocked ? 'none' : ''}`}}
                            >
                                <Col xs="5">
                                    <Field
                                        multi={false}
                                        name={`${member}.supplyDataEntryId`}
                                        label="Select Supplier"
                                        options={allMembers}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6">
                                    <Field
                                        multi={true}
                                        name={`${member}.fileRelPaths`}
                                        label="Select Files"
                                        options={allAttachFiles}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="1">
                                    {!isLocked &&
                                        <button type="button" className="btn btn-link" title="Remove" 
                                                onClick={() => fields.remove(index)}>
                                            <i className="icon-minus" />
                                        </button>
                                    }
                                </Col>
                            </Row>
                        ))}
                        {!isLocked &&
                            <Row>
                                <Col xs="12">
                                    <button type="button" className="btn btn-secondary" 
                                            onClick={() => fields.push({supplyDataEntryId: '0', fileRelPaths: []}) }>
                                        <i className="icon-plus" /> <FormattedMessage id="app.Add" defaultMessage="Add" />
                                    </button>
                                    {submitFailed && error && <span>{error}</span>}
                                </Col>
                            </Row>
                        }
                    </React.Fragment>
        }

        return (
            <Card>
                <CardHeader>
                    <b><FormattedMessage id="app.order.Attach_Files_Email_Invitation" defaultMessage="Attach Files Email Invitation" /></b>
                    <div className="card-actions">
                </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="3">
                            <FormGroup>
                                <Label>
                                    <FormattedMessage id="app.order.Attach_Files" defaultMessage="Attach Files" />
                                </Label>
                                {!isLocked &&
                                    <Field
                                        name="attachFileInput"
                                        component={FieldDropZone}
                                        handleFileDrops={handleFileDrops}
                                        label="Select Files"
                                        className="btn btn-outline-primary btn-sm btn-block"
                                        listDroppedFiles={false}
                                    />
                                }
                                {attachFiles && !isEmpty(attachFiles) && (
                                    <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                        {attachFiles.map((rsFile, idx) => (
                                            <li key={idx}>
                                                {!isLocked &&
                                                    <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(rsFile)}>
                                                        <i className="icon-minus" />
                                                    </button>
                                                }
                                                <a href={`${staticFileUrl}/${rsFile}`} target="_blank">{rsFile && rsFile.substring(10)}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </FormGroup>
                        </Col>
                        {attachFiles && !isEmpty(attachFiles) && 
                            <Col xs="9">
                                <Row>
                                    <Col xs="5">
                                        <Label><FormattedMessage id="app.order.Supplier" defaultMessage="Supplier" /></Label>
                                    </Col>
                                    <Col xs="6">
                                        <Label><FormattedMessage id="app.order.Files" defaultMessage="Files" /></Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FieldArray name="attachItems" component={renderAttachFiles}/>
                                    </Col>
                                </Row>
                            </Col>
                        }
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default AttachFileInvitation;