import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';

import {FieldRadioButtonGroup} from "../../../../../components/common/Form";
import {FormattedMessage} from "react-intl";
import { PRODUCT_CATEGORY_SKILLION_SHEDS } from '../../../../../constants';

const KneeBraceAndCollarTie = ({kneeBraceAndCollarTieOptions, kneeBraceAndCollarTie, productCategoryId}) => {
    const selectedOption = kneeBraceAndCollarTieOptions.find(item => item.id === kneeBraceAndCollarTie);
    return (
        <Card>
            <CardHeader className="p-2">
                <strong>
                    {productCategoryId === PRODUCT_CATEGORY_SKILLION_SHEDS ?
                        <FormattedMessage id="app.quotes.Knee_Brace" defaultMessage="Knee Brace" /> :
                        <FormattedMessage id="app.quotes.Knee_Brace_And_Collar_Tie" defaultMessage="Knee Brace And Collar Tie" />
                    }
                </strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs = "12">
                        <Field name="kneeBraceAndCollarTie" component={FieldRadioButtonGroup} items={kneeBraceAndCollarTieOptions}/>
                    </Col>
                </Row>
                {selectedOption && selectedOption.hasCollarTie && !selectedOption.hasKneeBrace &&
                    <Row>
                        <Col xs = "12">
                            <Label className = "col-form-label text-danger">
                                <FormattedMessage id = "app.quotes.WARNING_This_function_is_not_in_use" defaultMessage = "WARNING: This function is not in use"/>
                            </Label>
                        </Col>
                    </Row>
                }
            </CardBody>
        </Card>
    )
};

export default KneeBraceAndCollarTie;