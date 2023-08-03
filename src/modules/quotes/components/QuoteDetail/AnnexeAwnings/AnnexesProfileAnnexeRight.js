import React from 'react';
import {Row, Label, Col} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {FieldInputPure} from "../../../../../components/common/Form";


const AnnexesProfileAnnexeRight = ({isAnnexeRight, maxRightAnnexeHeight, handleAnnexeSpanChange}) => (
    <React.Fragment>
        {(isAnnexeRight) ?
            <React.Fragment>
                <Row>
                    <Label className="col-form-label pt-0 pb-1">
                        <FormattedMessage id="app.quotes.Annexe_Eave" defaultMessage="Annexe Eave"/>
                        {' '}
                        <Field name="annexeRight.height" type="number" component={FieldInputPure}
                               parse={(value) => value && Math.min(parseInt(value, 10), parseInt(maxRightAnnexeHeight, 10))}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                    </Label>
                </Row>
                <Row>
                    <Label className="col-form-label pt-0 pb-1">
                        <FormattedMessage id="app.quotes.Annexe_Span" defaultMessage="Annexe Span"/>
                        {' '}
                        <Field name="annexeRight.span" type="number" component={FieldInputPure}
                               parse={(value) => value && parseInt(value, 10)}
                               onBlur = {handleAnnexeSpanChange}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                    </Label>
                </Row>
            </React.Fragment>
            : null}
        <Row>
            <Col xs="12">
                <Label className="col-form-label pt-0">
                    <FormattedMessage id="app.quotes.Annexe" defaultMessage="Annexe"/>
                    {' '}
                    <Field name="isAnnexeRight" id="isAnnexeRight" component="input" type="checkbox"/>
                </Label>
            </Col>
        </Row>
    </React.Fragment>
);

export default AnnexesProfileAnnexeRight;