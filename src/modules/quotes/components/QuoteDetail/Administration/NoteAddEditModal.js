import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FieldInputPure} from "../../../../../components/common/Form";
import FieldDatePicker from "../../../../../components/common/Form/FieldDatePicker";
import {Row, Col} from 'reactstrap';
import {Label} from 'reactstrap';
import {Field, Form} from 'redux-form';
import PropTypes from "prop-types";
import {QUOTES_JOB_STATUSES} from '../../../constants';

class NoteAddEditModal extends React.Component {
    render() {
        const { note, activeNoteId, hasQuoteStatus, currentNoteData, jobStatus, pristine, invalid, submitting, handleNoteSubmit, handleModalClose } = this.props;
        return (
            <Form onSubmit={handleNoteSubmit}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                        <FormattedMessage id={hasQuoteStatus ? "app.quotes.Change_Quote_Status" : (activeNoteId >= 0 ? "app.quotes.Edit_Note" : "app.quotes.Add_New_Note")}
                            defaultMessage={hasQuoteStatus ? "Change Quote Status" : (activeNoteId >= 0 ? "Edit Note" : "Add New Note")}
                        />
                        </h4>
                        <button type="button" className="close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                                <FormattedMessage id="app.Close" defaultMessage="Close" />
                            </span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {hasQuoteStatus ?
                            <Row>
                                <Col xs="4">
                                    <Label>
                                        <FormattedMessage id="app.quotes.Quote_Status" defaultMessage="Quote Status"/>
                                    </Label>
                                </Col>
                                <Col xs="8">
                                    <Label>
                                        <Field component="select" name="noteJobStatus" id="noteJobStatus"
                                            className="form-control form-control-sm">
                                            {QUOTES_JOB_STATUSES && QUOTES_JOB_STATUSES.map((item, idx) =>
                                                <option key={idx} value={item.value}>{item.name}</option>
                                            )}
                                        </Field>
                                    </Label>
                                </Col>
                            </Row>
                            : null
                        }
                        {!hasQuoteStatus || activeNoteId >= 0 || currentNoteData.jobStatus !== jobStatus ?
                            <React.Fragment>
                                <Row>
                                    <Col xs="4">
                                        <Label className="col-form-label">
                                            <FormattedMessage id="app.quotes.User_Name" defaultMessage="User Name" />
                                        </Label>
                                    </Col>
                                    <Col xs="8">
                                        <Field name="noteName" type="text" component={FieldInputPure}
                                                className="form-control form-control-sm"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4">
                                        <Label className="col-form-label">
                                            <FormattedMessage id="app.quotes.Event_Description" defaultMessage="Event Description" />
                                        </Label>
                                    </Col>
                                    <Col xs="8">
                                        <Field name="noteDescription" type="text" component={FieldInputPure}
                                                className="form-control form-control-sm" readOnly={hasQuoteStatus}
                                        />
                                    </Col>
                                </Row>
                                <Row className="pb-2">
                                    <Col xs="4">
                                        <Label className="col-form-label">
                                            <FormattedMessage id="app.quotes.Content" defaultMessage="Content" />
                                        </Label>
                                    </Col>
                                    <Col xs="8">
                                        <Field name="noteContent" component={FieldInputPure}
                                                component="textarea" className="form-control" rows="5"
                                        />
                                    </Col>
                                </Row>
                            </React.Fragment>
                            : null
                        }
                        {!hasQuoteStatus ?
                            <React.Fragment>
                                <Row className="pt-2">
                                    <Col xs="4">
                                        <Field name="noteHasReminder" id="noteHasReminder"
                                            component="input" type="checkbox"
                                        />
                                        {' '}
                                        <FormattedMessage id="app.quotes.Add_Email_Reminder" defaultMessage="Add Email Reminder" />
                                    </Col>
                                    {currentNoteData.hasReminder ?
                                        <Col xs="4">
                                            <Label>
                                                <FormattedMessage id="app.quotes.Reminder_Date" defaultMessage="Reminder Date"/>
                                            </Label>
                                        </Col>
                                        : null
                                    }
                                    {currentNoteData.hasReminder ?
                                        <Col xs="4">
                                            <Label className="d-flex flex-row justify-content-end mb-0">
                                                <Field name="noteReminderDate" type="date" component={FieldDatePicker}
                                                    className="form-control form-control-sm"
                                                    placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                                    style={{width: '100px'}}
                                                />
                                            </Label>
                                        </Col>
                                        : null
                                    }
                                </Row>
                                {currentNoteData.hasReminder ?
                                    <Row className="pt-1">
                                        <Col>
                                            <Field name="noteIsTaskCompleted" id="noteIsTaskCompleted"
                                                component="input" type="checkbox"
                                            />
                                            {' '}
                                            <FormattedMessage id="app.quotes.Task_Completed" defaultMessage="Task Completed" />
                                        </Col>
                                    </Row>
                                    : null
                                }
                            </React.Fragment>
                            : null
                        }
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>
                            {activeNoteId >= 0 ?
                                <FormattedMessage id="app.Update" defaultMessage="Update" />
                                :<FormattedMessage id="app.Add" defaultMessage="Add" />
                            }

                        </button>
                    </div>
                </div>
            </Form>
        );
    }
} 

NoteAddEditModal.propTypes = {
    handleModalClose: PropTypes.func
};

export default NoteAddEditModal;