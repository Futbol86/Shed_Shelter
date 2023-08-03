import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {isEmpty, union} from 'lodash';
import {Field, FieldArray, change, Form} from 'redux-form';
import {Row, Col, Label, Card, CardHeader, CardBody, FormGroup} from 'reactstrap';
import {FieldAutoComplete, FieldDropZone} from "../../../../components/common/Form/index";
import {API_SUB_URL} from "../../constants";

class AttachFileInvitation extends Component {
    render() {
        const { contructionDetails, staticFileUrl, invalid, submitting, handleFileDrops, handleDeleteFile } = this.props;
        
        const allMembers = contructionDetails && contructionDetails.contructionMembers && contructionDetails.contructionMembers.length ?
                            contructionDetails.contructionMembers.map(contructionDataEntryId => {
                                let contructionDataEntry = this.props.contructionDataEntries.find(p => p.id === parseInt(contructionDataEntryId));
                                if(contructionDataEntry) {
                                    return {
                                        label: contructionDataEntry.tradesRegisteredName,
                                        value: contructionDataEntry.id + ''
                                    }
                                }
                            }) : [];

        const allAttachFiles = this.props.attachFiles && this.props.attachFiles.length ?
            this.props.attachFiles.map(attachFile => {
                return {
                    label: attachFile && attachFile.substring(10),
                    value: attachFile
                }
            }) : [];

        const renderAttachFiles = ({ fields, meta: { touched, error, submitFailed } }) => (
            <div className="container">
                {
                    fields && fields.map((member, index) => (
                        <Row key={index} className="mb-3">
                            <Col xs="4">
                                <Label><FormattedMessage id="app.contruction.Contructions" defaultMessage="Contructions" /></Label>
                                <Field
                                    multi={false}
                                    name={`${member}.contructionDataEntryId`}
                                    label="Select Contructions"
                                    options={allMembers}
                                    component={FieldAutoComplete}
                                />
                            </Col>
                            <Col xs="7">
                                <Label><FormattedMessage id="app.contruction.Files" defaultMessage="Files" /></Label>
                                <Field
                                    multi={true}
                                    name={`${member}.files`}
                                    label="Select Files"
                                    options={allAttachFiles}
                                    component={FieldAutoComplete}
                                />
                            </Col>
                            <Col xs="1">
                                <button type="button" className="btn btn-link pl-3 pt-0" title="Remove" 
                                        onClick={() => fields.remove(index)}>
                                    <i className="icon-minus" />
                                </button>
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <Col xs="12">
                        <button type="button" className="btn btn-secondary" 
                                onClick={() => fields.push({}) }>
                            <i className="icon-plus" /> <FormattedMessage id="app.Add" defaultMessage="Add" />
                        </button>
                        {submitFailed && error && <span>{error}</span>}
                    </Col>
                </Row>
            </div>
        )

        return (
            <Card>
                <CardHeader>
                    <b><FormattedMessage id="app.contruction.Attach_Files_Email_Invitation" defaultMessage="Attach Files Email Invitation" /></b>
                    <div className="card-actions">
                </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="3">
                            <FormGroup>
                                <Label>
                                    <FormattedMessage id="app.contruction.Attach_Files" defaultMessage="Attach Files" />
                                </Label>
                                <Field
                                    name="attachFileInput"
                                    component={FieldDropZone}
                                    handleFileDrops={handleFileDrops}
                                    label="Select Files"
                                    className="btn btn-outline-primary btn-sm btn-block"
                                    listDroppedFiles={false}
                                />
                                {this.props.attachFiles && !isEmpty(this.props.attachFiles) && (
                                    <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                        {this.props.attachFiles.map((rsFile, idx) => (
                                            <li key={idx}>
                                                <a href={`${staticFileUrl}${API_SUB_URL}/${rsFile}`} target="_blank">{rsFile && rsFile.substring(10)}</a>
                                                <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(rsFile)}>
                                                    <i className="icon-minus" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </FormGroup>
                        </Col>
                        <Col xs="9">
                            <FieldArray name="attachFiles" component={renderAttachFiles}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default AttachFileInvitation;