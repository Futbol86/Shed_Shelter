import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FieldInputPure, FieldAutoComplete} from "../../../../../components/common/Form";
import {Row, Col} from 'reactstrap';
import {Label} from 'reactstrap';
import {Field, Form} from 'redux-form';
import {uniqBy} from "lodash";

class TextMessageClientsModal extends React.Component {
    render() {
        const { 
            currentTextMessageData, quotes, textMessageResults, pristine, invalid, submitting, 
            handleSend, handleModalClose, userInfo 
        } = this.props;
        let listClientDetails = quotes && uniqBy(quotes.map(item => item.clientDetail || {}), 'id');
        listClientDetails = listClientDetails.filter(item => item.id !== null && item.id !== undefined);
        let listPhoneClients = listClientDetails.map(item => {
            return {
                label: item.contact1.name,
                value: item.contact1.phoneHome,
            }
        });

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
                                    <FormattedMessage id="app.quotes.Mobile_Clients" defaultMessage="Mobile Clients" />
                                </Label>
                            </Col>
                            <Col xs="8">
                                <Field name="textMessagePhoneClients" multi={true} options={listPhoneClients}
                                       component={FieldAutoComplete} disabled={true}
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
                                <Field name="textMessageContent" component="textarea" className="form-control" rows="5"/>
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
                        {
                            textMessageResults && textMessageResults.length !== 0 &&
                            <React.Fragment>
                                <hr />
                                <Row>
                                    <Col xs="12">
                                        <u>Text Messages Client Results:</u>
                                    </Col>
                                </Row>
                                {
                                    textMessageResults.map((tmr, idx) => {
                                        const findOCD = listClientDetails.find(item => item.contact1.phoneHome === tmr.phone);
                                        return (
                                            <Row key={idx} className="mt-2">
                                                <Col xs="4">
                                                    {findOCD && findOCD.contact1.name}
                                                </Col>
                                                <Col xs="4">{tmr.phone}</Col>
                                                <Col xs="4" className={`${tmr.status === "SUCCESS" ? "text-success" : "text-danger"}`}>
                                                    {tmr.status}
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </React.Fragment>
                        }
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

export default TextMessageClientsModal;