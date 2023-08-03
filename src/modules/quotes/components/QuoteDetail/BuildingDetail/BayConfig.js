import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {FieldInputPure} from '../../../../../components/common/Form';
import {Field, FieldArray} from 'redux-form';
import BayConfigBayList from "../../../containers/QuoteDetail/BuildingDetail/BayConfigBayList";
import {FormattedMessage} from "react-intl";
import {PREDEFINED_BD_BRIDGING} from "../../../../../constants";
import {getPurlinAndGirtFromID} from "../../../selectors";

class BayConfig extends Component {
    render() {
        const {
            productId, numberOfBays, buildingLength, changeFieldValue, productParams, purlinAndGirtType,
            handleBayChangeClick, handleNumberOfBaysChange, handleSaveDataOnFocus
        } = this.props;
        const purlinAndGirt = getPurlinAndGirtFromID(purlinAndGirtType, productId);

        return (
            <Card>
                <CardHeader className="p-2">
                    <strong>Bay Configuration</strong>
                </CardHeader>
                <CardBody className="p-2">
                    <Row>
                        <Col xs={7} className="d-flex flex-row justify-content-between">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Number_of_Bays" defaultMessage="Number of Bays" />
                            </Label>

                            <Field name="numberOfBays" type="number" component={FieldInputPure}
                                   className="form-control form-control-sm text-right p-1" style={{width: "80px"}}
                                   onBlur={handleNumberOfBaysChange} onFocus={handleSaveDataOnFocus}
                                   readOnly={productParams && (buildingLength > productParams.max_length || buildingLength < productParams.min_length)}
                            />

                            <div className="d-flex flex-row">
                                <Button color="primary" className="btn btn-sm mt-0 mr-1 mb-1"
                                        onClick={() => handleBayChangeClick('plus')}>
                                    +
                                </Button>

                                <Button color="primary" className="btn btn-sm mt-0 mr-1 mb-1"
                                        onClick={() => handleBayChangeClick('minus')}>
                                    -
                                </Button>
                            </div>
                        </Col>
                        <Col xs={5} className="d-flex flex-row justify-content-end pl-2">
                            <Label className="col-form-label pr-1">
                                <FormattedMessage id="app.quotes.Bridging" defaultMessage="Bridging" />
                            </Label>
                            <Field component="select" name="bdBridging" id="bdBridging"
                                   className="form-control form-control-sm text-right" style={{width: "60px"}}>
                                {PREDEFINED_BD_BRIDGING.map((item, idx) =>
                                    <option key={idx} value={item.id}>{item.name}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>

                    <FieldArray name="bays" component={BayConfigBayList} changeFieldValue={changeFieldValue}
                                minBayLength={(purlinAndGirt && purlinAndGirt.bayMin) || 1}
                                maxBayLength={(purlinAndGirt && purlinAndGirt.bayMax) || 1}
                                numberOfBays={numberOfBays} buildingLength={buildingLength}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default BayConfig;