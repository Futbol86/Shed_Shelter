import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import classnames from "classnames";
import {isEmpty} from 'lodash';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import {FieldInputPure, FieldDropdownList, FieldDropZone} from "../../../../components/common/Form/index";
import {API_SUB_URL} from '../../constants';

class ContructionNoteAdd extends Component {
    render() {
        const { userId, contructionDetails, staticFileUrl, noteFiles, editingNote, toUserId } = this.props;
        const { handleFileDrops, handleDeleteFile, handleCancelClick } = this.props;
        const { handleSubmit, touched, submitting, pristine, invalid, reset, error } = this.props;    

        let toUserList = [];
        let contructionMembers = contructionDetails && contructionDetails.contructionMemberDetails.filter(item => item.userId !== userId);

        if (contructionMembers) {
            for (let i = 0; i < contructionMembers.length; i++) {
                toUserList.push({
                    userId: contructionMembers[i].userId,
                    name:   contructionMembers[i].tradesRegisteredName
                });
            }
        }

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <strong>
                                {editingNote ? 
                                    <FormattedMessage id="app.contruction.Edit_Note" defaultMessage="Edit Note" />
                                : <FormattedMessage id="app.contruction.Add_Note" defaultMessage="Add Note" />}
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup className={classnames({error: touched && error})}>
                                <Label>
                                    <FormattedMessage id="app.contruction.To" defaultMessage="To" />
                                    {' '}<span className="text-red">(*)</span>
                                </Label>
                                <Field name="toUserId" className="mb-4"
                                    textField="name" valueField="userId" titleOption="-- Select --"
                                    data={toUserList}
                                    component={FieldDropdownList} />
                            </FormGroup>
                            <FormGroup className={classnames({error: touched && error})}>
                                <Label>
                                    <FormattedMessage id="app.contruction.Note" defaultMessage="Category" />
                                    {' '}<span className="text-red">(*)</span>
                                </Label>
                                <Field name="content" component={FieldInputPure}
                                    readOnly={!(toUserId)}
                                    component="textarea" className="form-control mb-3" rows="5"
                                />
                            </FormGroup>
                            <FormGroup className={classnames({error: touched && error})}>
                                <Label>
                                    <FormattedMessage id="app.contruction.Files" defaultMessage="Files" />
                                </Label>
                                
                                <Field
                                    name="noteFileInput"
                                    component={FieldDropZone}
                                    disabled={!(toUserId)}
                                    handleFileDrops={handleFileDrops}
                                    label="Select Files"
                                    className="btn btn-outline-primary btn-sm btn-block"
                                    listDroppedFiles={false}
                                />
                                {noteFiles && !isEmpty(noteFiles) && (
                                    <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                        {noteFiles.map((rsFile, idx) => (
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
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button type="submit" className="btn btn-dark" disabled={pristine || submitting || invalid}> 
                                {editingNote ? <FormattedMessage id="app.Update" defaultMessage="Update" />
                                    :<FormattedMessage id="app.Add" defaultMessage="Add" />}
                            </Button>
                            <Button type="button" color="secondary" disabled={pristine || submitting} onClick={handleCancelClick}>
                                <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

ContructionNoteAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default ContructionNoteAdd