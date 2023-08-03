import React from 'react';
import { Row, Col } from 'reactstrap';
import {FormattedMessage} from "react-intl";
import {Field} from "redux-form";
import {FieldInputPure} from "../../../../components/common/Form";

const SignatureSection = ({dealerInfo}) => {
    return (
        <Row>
            <Col xs={12} className="pt-5">
                <Row>
                    <Col xs={12} className="font-weight-bold text-center">
                        <FormattedMessage id="app.For" defaultMessage="For" /> {dealerInfo.tradingName}
                    </Col>
                </Row>
                <Row className="pt-1 pb-2 pr-2">
                    <Col xs={6} className="font-weight-bold">
                        <FormattedMessage id="app.Name" defaultMessage="Name" />:
                    </Col>
                    <Col xs={6}>
                        <Field name="dealerRepresentative" type="text" component={FieldInputPure}
                               className="form-control form-control-sm ml-1 mr-1"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ul className="dot-leaders">
                            <li><span className="font-weight-bold">
                            <FormattedMessage id="app.docs.Signature" defaultMessage="Signature" />:
                        </span></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ul className="dot-leaders">
                            <li><span className="font-weight-bold">
                            <FormattedMessage id="app.quotes.Date" defaultMessage="Date" />:
                        </span></li>
                        </ul>
                    </Col>
                </Row>
            </Col>
          
        </Row>
    );
};

export default SignatureSection;