import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FieldInputPure} from "../../../../../components/common/Form";
import {Row, Col} from 'reactstrap';
import {Label} from 'reactstrap';
import {Field, Form} from 'redux-form';

class TextMessageModal extends React.Component {
    render() {
        const { pristine, invalid, submitting, currentTextMessageData, handleSend, handleModalClose, userInfo } = this.props;
        return (
            <Form onSubmit={handleSend}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <FormattedMessage id="app.quotes.Text_Message" defaultMessage="Text Message" />
                        </h4>
                        <button type="button" className="close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                                <FormattedMessage id="app.Close" defaultMessage="Close" />
                            </span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Row>
                            <Col xs="4">
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Sender_Identity" defaultMessage="Sender Identity"/>
                                </Label>
                            </Col>
                            <Col xs="8">
                                <Field name="textMessageSenderIdentity" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm" readOnly={!userInfo || Number(userInfo.id) !== 1}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4">
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Mobile" defaultMessage="Mobile" />
                                </Label>
                            </Col>
                            <Col xs="8">
                                <Field name="textMessagePhoneMobile" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4">
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Content" defaultMessage="Content" />
                                </Label>
                            </Col>
                            <Col xs="8">
                                <Field name="textMessageContent" component={FieldInputPure}
                                    component="textarea" className="form-control" rows="5"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Label className={`col-form-label pull-right ${currentTextMessageData && currentTextMessageData.content
                                    && currentTextMessageData.content.length > 160 ? 'text-red font-weight-bold' : ''}`}
                                >
                                    {(currentTextMessageData && currentTextMessageData.content && currentTextMessageData.content.length) || 0}/160
                                </Label>
                            </Col>
                        </Row>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={handleSend} disabled={submitting || invalid || pristine}>
                            <FormattedMessage id="app.Send" defaultMessage="Send" />
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
} 

export default TextMessageModal;