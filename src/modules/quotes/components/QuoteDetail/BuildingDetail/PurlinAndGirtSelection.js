import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {Field} from 'redux-form';

import {PRODUCT_TYPES} from "../../../../../constants";
import {FieldRadioButtonGroup} from "../../../../../components/common/Form";
import {FormattedMessage} from "react-intl";

const PurlinAndGirtSelection = ({productId, handlePurlinAndGirtTypeChange}) => {
    const product = PRODUCT_TYPES.find(item => item.id === productId);
    return (
        <Card>
            <CardHeader className="p-2">
                <strong>
                    <FormattedMessage id="app.quotes.Purlin_And_Girt_Selection" defaultMessage="Purlin And Girt Selection" />
                </strong>
            </CardHeader>
            <CardBody className="p-2">
                <div className="">
                    <Field name="purlinAndGirtType"
                        component={FieldRadioButtonGroup}
                        items={product && product.purlinAndGirts}
                        onChange={handlePurlinAndGirtTypeChange}
                    />
                </div>
            </CardBody>
        </Card>
    )
};

export default PurlinAndGirtSelection;