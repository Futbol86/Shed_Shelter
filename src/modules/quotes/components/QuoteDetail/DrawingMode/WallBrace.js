import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FieldInputPure} from "../../../../../components/common/Form";
import {FormattedMessage} from 'react-intl';
import { PREDEFINED_BRACE_SELECTION, STRAMIT_PREDEFINED_BRACE_SELECTION, STRAMIT } from "../../../../../constants";
import { WALL_BRACE_LOCATION_OPTIONS } from "../../../constants";

class WallBrace extends React.Component {
    render(){
        const { isEndWall, isLeftAwningEndWall, isRightAwningEndWall,
            handleWallBraceTypeChange, handleWallBraceLocationChange, rollFormSupply } = this.props;
        let braceSelection = (rollFormSupply === STRAMIT)
                ? STRAMIT_PREDEFINED_BRACE_SELECTION : PREDEFINED_BRACE_SELECTION;
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Label className="col-form-label d-flex flex-row justify-content-between">
                            <span>
                                {(isEndWall || isLeftAwningEndWall || isRightAwningEndWall) &&
                                    <FormattedMessage id="app.quotes.End_Wall" defaultMessage="End Wall" />
                                }
                                {!isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall && 
                                    <FormattedMessage id="app.quotes.Side_Wall" defaultMessage="Side Wall" />
                                }
                            </span>
                            <Field  component="select" name="wallBraceType" style={{width: '150px'}}
                                    parse={(value) => value && parseInt(value, 10)}
                                    onChange = {handleWallBraceTypeChange}
                                    className="form-control form-control-sm text-left ml-0">
                                    <FormattedMessage id="app.quotes.Not_Use" defaultMessage="Not Use" >
                                        {(message) => <option value="0">{message}</option>}
                                    </FormattedMessage>
                                    {braceSelection.map((item, idx) =>
                                        <option key={idx} value={item.id}>{item.name}</option>
                                    )}
                            </Field>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label className="col-form-label d-flex flex-row justify-content-between">
                            <span>
                                <FormattedMessage id="app.quotes.Location" defaultMessage="Location" />
                            </span>
                            <Field  component="select" name="wallBraceLocation" style={{width: '150px'}}
                                    onChange = {handleWallBraceLocationChange}
                                    parse={(value) => value && parseInt(value, 10)}
                                    className="form-control form-control-sm text-left ml-0">
                                    {WALL_BRACE_LOCATION_OPTIONS.map((item, idx) =>
                                        <option key={idx} value={item.id}>{item.location}</option>
                                    )}
                        </Field>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label className="col-form-label d-flex flex-row justify-content-between">
                            <span>
                                <FormattedMessage id="app.quotes.Strength" defaultMessage="Strength" />
                            </span>
                            <Field type="text" component={FieldInputPure} readOnly={true}
                                name='wallBraceStrength' style={{width: '100px'}}
                                className="form-control form-control-sm text-right ml-1"
                            />
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label className="col-form-label d-flex flex-row justify-content-between">
                            <span>
                                <FormattedMessage id="app.quotes.Total_Strength" defaultMessage="Total Strength" />
                            </span>
                            <Field  type="text" component={FieldInputPure} readOnly={true}
                                    name='totalWallBraceStrength' style={{width: '100px'}}
                                    className="form-control form-control-sm text-right ml-1"
                            />
                        </Label>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default WallBrace;