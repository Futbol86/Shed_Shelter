import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {PREDEFINED_ACCESSORIES_MATERIAL_LIST} from "../../../../../constants";
import {FieldInputPure} from "../../../../../components/common/Form";
import WallsColourDropDown from "../BuildingColour/WallsColourDropDown";
import SkylightSelectionView from "../../../containers/QuoteDetail/OtherAccessories/SkylightSelectionView";

const Skylights = ({buildingLength, changeFieldValue, skylightGarageRoofs,
                       maxSelectableSkylight, skylightColorOptions,
                       materialProfileList, productCategoryId}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Skylights" defaultMessage="Skylights" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="3">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Material" defaultMessage="Material" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field component="select" name="skylightMaterial" id="skylightMaterial"
                               className="form-control form-control-sm text-right"
                        >
                            <option value=""></option>
                            {materialProfileList.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                <Row>
                    <Col xs="3">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field name="skylightColor" component={WallsColourDropDown}
                               options={skylightColorOptions} />
                    </Col>
                </Row>

                <Row>
                    <Col xs="4">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Garage_Skylights" defaultMessage="Garage Skylights" />
                        </Label>
                    </Col>
                    <Col xs="8">
                        <Label className="col-form-label d-flex flex-row">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />

                            <Field name="skylightGarageQty" type="number" component={FieldInputPure}
                                   className="form-control form-control-sm text-right ml-2 mr-2" style={{width: '80px'}}
                                   parse={value => Number(value)} readOnly={true}
                            />{' '}

                            <span className="font-weight-bold">
                                (
                                <FormattedMessage id="app.Max" defaultMessage="Max" />{' '}
                                <FormattedNumber value={maxSelectableSkylight} />
                                )
                            </span>

                        </Label>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <Label className="col-form-label text-danger">
                            <FormattedMessage id="app.quotes.Skylights_warning_message" defaultMessage="The maximum length for this skylight material is 12,200 mm." />
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12" lg="12" style={{'maxWidth': '100%', 'overflowX': 'auto'}}>
                        <SkylightSelectionView changeFieldValue={changeFieldValue}
                                               skylightGarageRoofs={skylightGarageRoofs} 
                                               productCategoryId={productCategoryId}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default Skylights;