import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {Row, Col, Label} from 'reactstrap';
import {FieldInputPure} from "../../../../components/common/Form";

const Price = ({foundFrame}) => (
    <React.Fragment>
        <Row className="d-flex justify-content-end">
            <Col xs="4" md="2" className="d-flex flex-row justify-content-end">
                <Label className ="col-form-label-lg">
                    <FormattedMessage id="app.quotes.Total_Price" defaultMessage="Total Price"/>
                </Label>
            </Col>
            <Col xs="4" md="2">
                <Field 
                    name="totalPrice" 
                    component={FieldInputPure}
                    readOnly = {true}
                    className="form-control form-control-lg text-center p-1 font-weight-bold"
                    style = {{backgroundColor: 'yellow'}}
                />
            </Col>
        </Row>
        {!foundFrame &&
            <Row>
                <Col xs = "12" className="d-flex flex-row justify-content-end">
                    <Label className = "col-form-label text-danger font-weight-bold">
                        <FormattedMessage id = "app.quotes.WARNING_Cannot_find_a_suitable_frame" defaultMessage = "WARNING: Cannot find a suitable frame"/>
                    </Label>
                </Col>
            </Row>
        }
    </React.Fragment>
)

export default Price;