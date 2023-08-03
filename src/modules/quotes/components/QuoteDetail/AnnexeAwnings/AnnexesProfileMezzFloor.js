import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {FieldInputPure} from "../../../../../components/common/Form";
import {PREDEFINED_ANNEXE_MEZZ_FLOOR_MODES} from "../../../../../constants";


const AnnexesProfileMezzFloor = ({isMezzanineFloor}) => (
    <React.Fragment>
        <Row>
            <Col className="form-inline">
                <Label className="col-form-label">
                    <FormattedMessage id="app.quotes.Mezzanine_Floor" defaultMessage="Mezzanine Floor"/>
                    {' '}
                    <Field name="isMezzanineFloor" id="isMezzanineFloor" component="input" type="checkbox"/>
                </Label>{' '}
                {isMezzanineFloor ?
                <Field component="select" name="mezzanineFloor.floorMode"
                       className="form-control form-control-sm text-left ml-1">
                    <option value="0"></option>
                    {PREDEFINED_ANNEXE_MEZZ_FLOOR_MODES.map((item, idx) =>
                        <option key={idx} value={item.id}>{item.name}"</option>
                    )}
                </Field>
                : null}
            </Col>
        </Row>
        {isMezzanineFloor ?
        <Row>
            <Col className="form-inline">
                <Label className="col-form-label">
                    <FormattedMessage id="app.quotes.Clearance_height" defaultMessage="Clearance height"/>: {' '}

                    <Field name="mezzanineFloor.height" type="number" component={FieldInputPure}
                           parse={(value) => value && parseInt(value, 10)}
                           className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                </Label>
            </Col>
        </Row>
        :null}
    </React.Fragment>
);

export default AnnexesProfileMezzFloor;