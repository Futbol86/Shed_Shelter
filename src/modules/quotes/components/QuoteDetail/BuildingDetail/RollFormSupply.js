import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from "react-intl";

import {PREDEFINED_ROLL_FORM_SUPPLY} from "../../../../../constants";
import {FieldRadioButtonGroup} from "../../../../../components/common/Form";

const RollFormSupply = ({handleRollFormSupplyChange}) => (
    <Card>
        <CardHeader className="p-2">
            <strong><FormattedMessage id="app.quotes.Roll_Form_Supply" defaultMessage="Roll Form Supply" /></strong>
        </CardHeader>
        <CardBody className="p-2">
            <div className="">
                <Field name="rollFormSupply" component={FieldRadioButtonGroup} items={PREDEFINED_ROLL_FORM_SUPPLY} onChange = {handleRollFormSupplyChange} />
            </div>
        </CardBody>
    </Card>
);

export default RollFormSupply;