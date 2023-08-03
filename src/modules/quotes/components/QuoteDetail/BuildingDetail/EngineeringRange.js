import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {FormattedNumber, FormattedMessage} from 'react-intl';
import {FieldInputPure} from '../../../../../components/common/Form';
import {Field} from 'redux-form';
import {
    PREDEFINED_ENGINEERING_CLASSES,
    PREDEFINED_BUILDING_PURPOSE_CATEGORIES,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../../../../../constants";
import {getPurlinAndGirtFromID} from "../../../selectors";

class EngineeringRange extends Component {
    render() {
        const {product, productCategoryId, purlinAndGirtType, handleLengthChange, handleHeightChange, handleSaveDataOnFocus} = this.props;
        const purlinAndGirt = getPurlinAndGirtFromID(purlinAndGirtType, product.id);
        const minSpan = (purlinAndGirt && purlinAndGirt.spanMin) || 0;
        const maxSpan = (purlinAndGirt && purlinAndGirt.spanMax) || 0;
        const minLength = (product && product.params && product.params.min_length) || 0;
        const maxLength = (product && product.params && product.params.max_length) || 0;
        const minHeight = (purlinAndGirt && purlinAndGirt.heightMin) || 0;
        const maxHeight = (purlinAndGirt && purlinAndGirt.heightMax) || 0;
        const isSkillionRoof = productCategoryId && (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
            productCategoryId === PRODUCT_CATEGORY_SKILLION_SHEDS);
        return (
            <Card>
                <CardHeader className="p-2">
                    <strong><FormattedMessage id="app.quotes.Engineering_Range" defaultMessage="Engineering Range" /></strong>
                </CardHeader>
                <CardBody className="p-2">
                    <Row>
                        <Col xs="12" md="3">
                            <Label className="col-form-label" className="d-flex justify-content-between font-weight-bold">
                                <FormattedMessage id="app.quotes.Class" defaultMessage="Class" /> {' '}
                                <Field component="select" name="engineerClass" id="engineerClass"
                                       className="form-control form-control-sm">
                                    {PREDEFINED_ENGINEERING_CLASSES.map((item, idx) =>
                                        <option key={idx} value={item.id}>{item.name}</option>
                                    )}
                                </Field>
                            </Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Row className="mb-2">
                                <Col xs="4" />
                                <Col xs="3" className="font-weight-bold">
                                    <FormattedMessage id="app.quotes.Actual" defaultMessage="Actual" />
                                </Col>
                                <Col xs="5" className="font-weight-bold text-right">
                                    Range
                                </Col>
                            </Row>

                            <Row className="mb-1">
                                <Col xs="4">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Span" defaultMessage="Span" />
                                    </Label>
                                </Col>
                                <Col xs="3">
                                    <Field name="buildingSpan" type="number" component={FieldInputPure}
                                           parse={(value) => value && parseInt(value, 10)}
                                           className="text-right p-1" />
                                </Col>
                                <Col xs="5" className="text-right">
                                    <Label className="col-form-label">
                                        <span className="font-weight-bold">
                                            <FormattedNumber value={minSpan} />
                                        </span>
                                        {' '}to {' '}
                                        <span className="font-weight-bold">
                                            <FormattedNumber value={maxSpan} />
                                        </span>
                                    </Label>
                                </Col>
                            </Row>

                            <Row className="mb-1">
                                <Col xs="4">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Length" defaultMessage="Length" />
                                    </Label>
                                </Col>
                                <Col xs="3">
                                    <Field name="buildingLength" type="number" component={FieldInputPure}
                                           parse={(value) => value && parseInt(value, 10)}
                                           onBlur={handleLengthChange} onFocus={handleSaveDataOnFocus}
                                           className="text-right p-1"
                                    />
                                </Col>
                                <Col xs="5" className="text-right">
                                    <Label className="col-form-label">
                                        <span className="font-weight-bold">
                                            <FormattedNumber value={minLength} />
                                        </span>
                                        {' '}to {' '}
                                        <span className="font-weight-bold">
                                            <FormattedNumber value={maxLength} />
                                        </span>
                                    </Label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="4">
                                    <Label className="col-form-label">
                                        {isSkillionRoof ?
                                            <FormattedMessage id="app.quotes.Lower_Eave_Height" defaultMessage="Lower Eave Height" /> :
                                            <FormattedMessage id="app.quotes.Height" defaultMessage="Height" />
                                        }
                                    </Label>
                                </Col>
                                <Col xs="3">
                                    <Field name="buildingHeight" type="number" component={FieldInputPure}
                                           parse={(value) => value && parseInt(value, 10)}
                                           onBlur={handleHeightChange} onFocus={handleSaveDataOnFocus}
                                           className="text-right p-1"
                                    />

                                </Col>
                                <Col xs="5" className="text-right">
                                    <Label className="col-form-label">
                                        <span className="font-weight-bold">
                                            <FormattedNumber value={minHeight} />
                                        </span>
                                        {' '}to {' '}
                                        <span className="font-weight-bold">
                                            <FormattedNumber value={maxHeight} />
                                        </span>
                                    </Label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs="4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Purpose_of_Building" defaultMessage="Purpose of Building" />
                            </Label>
                        </Col>
                        <Col xs="8">
                            <Field name="engineerBuildingPurpose" type="text" component="select"
                                   className="form-control form-control-sm text-right"
                                   readOnly={true} disabled={true}
                            >
                                {PREDEFINED_BUILDING_PURPOSE_CATEGORIES.map((item, idx) =>
                                    <option key={idx} value={item.id}>{item.name}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default EngineeringRange;