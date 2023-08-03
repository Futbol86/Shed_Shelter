import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Row, Col, Label} from 'reactstrap';
import {Field, Form} from 'redux-form';
import { FIND_US_CONTENTS } from '../../../constants';

import isEmpty from 'lodash/isEmpty';

class FindUsModal extends React.Component {
    render() {
        const { findUs, handleSubmit, handleModalClose } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <FormattedMessage id="app.quotes.Find_Us" defaultMessage="Find Us" />
                        </h4>
                        <button type="button" className="close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                                <FormattedMessage id="app.Close" defaultMessage="Close" />
                            </span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { FIND_US_CONTENTS && FIND_US_CONTENTS.map((item, idx1) => {
                            return  <React.Fragment key={idx1}>
                                        <Row key={idx1} className="pt-1">
                                            <Col xs="12">
                                                <Label className="col-form-label font-weight-bold">
                                                    {item.name}
                                                </Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {item.details && item.details.map((detail, idx2) => {
                                                return  <React.Fragment key={100 * idx1 + idx2}>
                                                            <Col xs="10" md="5" className="offset-1">
                                                                <Label className="col-form-label">
                                                                    <Field name={`${item.value}.${detail.value}`} component="input" type="checkbox" />
                                                                    {' '}
                                                                    {detail.name}
                                                                </Label>
                                                            </Col>
                                                            {detail.hasContent && findUs && findUs[item.value]
                                                                && findUs[item.value][detail.value] &&
                                                                <Col md="11" className="offset-1">
                                                                    <Field name={`${item.value}.${detail.contentValue}`}
                                                                        component="textarea" className="form-control" rows="5"
                                                                    />
                                                                </Col>
                                                            }
                                                        </React.Fragment>
                                            })}
                                        </Row>
                                    </React.Fragment>
                            })}
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {!findUs || isEmpty(findUs) ?
                                <FormattedMessage id="app.Add" defaultMessage="Add" /> :
                                <FormattedMessage id="app.Update" defaultMessage="Update" />
                            }
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
} 

export default FindUsModal;