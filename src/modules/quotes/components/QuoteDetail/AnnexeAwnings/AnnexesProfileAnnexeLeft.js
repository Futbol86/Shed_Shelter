import React from 'react';
import {Row, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {FieldInputPure} from "../../../../../components/common/Form";


const AnnexesProfileAnnexeLeft = ({isAnnexeLeft, maxLeftAnnexeHeight, handleAnnexeSpanChange}) => (
    <React.Fragment>
        {(isAnnexeLeft) ?
            <React.Fragment>
                <Row>
                    <Label className="col-form-label pt-0 pb-1">
                        <FormattedMessage id="app.quotes.Annexe_Eave" defaultMessage="Annexe Eave"/>
                        {' '}
                        <Field name="annexeLeft.height" type="number" component={FieldInputPure}
                               parse={(value) => value && Math.min(parseInt(value, 10), parseInt(maxLeftAnnexeHeight, 10))}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                    </Label>
                </Row>
                <Row>
                    <Label className="col-form-label pt-0 pb-1">
                        <FormattedMessage id="app.quotes.Annexe_Span" defaultMessage="Annexe Span"/>
                        {' '}
                        <Field name="annexeLeft.span" type="number" component={FieldInputPure}
                               parse={(value) => value && parseInt(value, 10)}
                               onBlur = {handleAnnexeSpanChange}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                    </Label>
                </Row>
            </React.Fragment>
            : null}
        <Row>
            <Label className="col-form-label pt-0">
                <FormattedMessage id="app.quotes.Annexe" defaultMessage="Annexe"/>
                {' '}
                <Field name="isAnnexeLeft" id="isAnnexeLeft" component="input" type="checkbox"/>
            </Label>
        </Row>
    </React.Fragment>
);

export default AnnexesProfileAnnexeLeft;