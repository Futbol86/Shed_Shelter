import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import classnames from "classnames";
import { isEmpty } from 'lodash';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import {FieldInputPure, FieldDropdownList, FieldDropZone} from "../../../../components/common/Form/index";

class OrderNoteAdd extends Component {
    render() {
        const { orderUserDetails, invitedSupplyDataEntries, staticFileUrl, noteFiles, editingNote, toUserId } = this.props;
        const { handleFileDrops, handleDeleteFile, handleCancelClick } = this.props;
        const { handleSubmit, touched, submitting, pristine, invalid, reset, error } = this.props;    

        let toUserList = [];
        if (orderUserDetails) {
            toUserList.push({
                userId: orderUserDetails.id,
                name:   `${orderUserDetails.firstName} ${orderUserDetails.lastName}`
            });
        }

        if (invitedSupplyDataEntries && invitedSupplyDataEntries.length) {
            for (let i = 0; i < invitedSupplyDataEntries.length; i++) {
                toUserList.push({
                    userId: invitedSupplyDataEntries[i].userId,
                    name:   invitedSupplyDataEntries[i].company
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
                                    <FormattedMessage id="app.order.Edit_Note" defaultMessage="Edit Note" />
                                : <FormattedMessage id="app.order.Add_Note" defaultMessage="Add Note" />}
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup className={classnames({error: touched && error})}>
                                <Label>
                                    <FormattedMessage id="app.order.To" defaultMessage="To" />
                                    {' '}<span className="text-red">(*)</span>
                                </Label>
                                <Field name="toUserId" className="mb-4"
                                    textField="name" valueField="userId" titleOption="-- Select --"
                                    data={toUserList}
                                    component={FieldDropdownList} />
                            </FormGroup>
                            <FormGroup className={classnames({error: touched && error})}>
                                <Label>
                                    <FormattedMessage id="app.order.Note" defaultMessage="Category" />
                                    {' '}<span className="text-red">(*)</span>
                                </Label>
                                <Field name="content" component={FieldInputPure}
                                    readOnly={!(toUserId)}
                                    component="textarea" className="form-control mb-3" rows="5"
                                />
                            </FormGroup>
                            <FormGroup className={classnames({error: touched && error})}>
                                <Label>
                                    <FormattedMessage id="app.order.Files" defaultMessage="Files" />
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
                                                <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(rsFile)}>
                                                    <i className="icon-minus" />
                                                </button>
                                                <a href={`${staticFileUrl}/${rsFile}`} target="_blank">{rsFile && rsFile.substring(10)}</a>
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

OrderNoteAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default OrderNoteAdd