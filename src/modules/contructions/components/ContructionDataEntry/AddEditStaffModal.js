import React, {Component} from 'react';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {Row, Col, Label} from 'reactstrap';
import {FieldInputPure} from "../../../../components/common/Form";

class AddEditStaffModal extends Component {
    render() {
        const { currentModalType, handleAddUpdateClick, handleModalClose, submitting, pristine, invalid, reset } = this.props;
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        {
                            currentModalType === "add-staff" ?
                            <FormattedMessage id="app.contruction.Add_Staff" defaultMessage="Add Staff" /> :
                            <FormattedMessage id="app.contruction.Edit_Staff" defaultMessage="Edit Staff" />
                        }
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row className="mb-2">
                        <Col xs="6" md="6">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Staff_Name" defaultMessage="Staff Name" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="6">
                            <Field name='name' type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="6" md="6">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Position" defaultMessage="Position" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="6">
                            <Field name='position' type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="6" md="6">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Contact" defaultMessage="Contact" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="6">
                            <Field name='contact' type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="6" md="6">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Next_Of_Kin" defaultMessage="Next Of Kin" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="6">
                            <Field name='nextOfKin' type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="6" md="6">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Relationship" defaultMessage="Relationship" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="6">
                            <Field name='relationship' type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        <i className="fa fa-times fa-lg" /> {' '}
                        <FormattedMessage id="app.Close" defaultMessage="Close" />
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={handleAddUpdateClick}
                        disabled={submitting || invalid || pristine}
                    >
                        {
                            currentModalType === "add-staff" ?
                            <FormattedMessage id="app.Save" defaultMessage="Save" /> :
                            <FormattedMessage id="app.Update" defaultMessage="Update" />
                        }
                    </button>
                </div>
            </div>
        )
    }
}

export default AddEditStaffModal;