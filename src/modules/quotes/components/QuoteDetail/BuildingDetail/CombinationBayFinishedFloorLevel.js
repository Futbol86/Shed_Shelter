import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {FieldInputPure} from '../../../../../components/common/Form';
import {Field} from 'redux-form';
import {PREDEFINED_FFL_RANGES} from '../../../../../constants';
import {WALL_LEFT_INDEX, ANNEXE_LEFT_ID, ANNEXE_RIGHT_ID} from '../../../constants';

class CombinationBayFinishedFloorLevel extends React.Component{
    render() {
        const {baseBays, selectedBayIndex, handleFFLChange} = this.props;
        const garaportFFLRange = PREDEFINED_FFL_RANGES.find(range => range.id === "Garaport");
        const awningFFLRange = PREDEFINED_FFL_RANGES.find(range => range.id === "Awning");
        const garaportFFLMin = (garaportFFLRange && garaportFFLRange.min) || 0;
        const garaportFFLMax = (garaportFFLRange && garaportFFLRange.max) || 0;
        const awningFFLMin = (awningFFLRange && awningFFLRange.min) || 0;
        const awningFFLMax = (awningFFLRange && awningFFLRange.max) || 0;
        const bays = baseBays.filter(bay => bay.bayIndex === Number(selectedBayIndex));
        const hasLeftAwning = bays && bays.length > 0 && bays.some(bay => bay.hasAnnexe && bay.annexeIndex === ANNEXE_LEFT_ID);
        const hasRightAwning = bays && bays.length > 0 && bays.some(bay => bay.hasAnnexe && bay.annexeIndex === ANNEXE_RIGHT_ID);
        
        return(
            <React.Fragment>
                <Row>
                    <Col xs = "12">
                        <Label className = "col-form-label font-weight-bold">
                            <FormattedMessage id = "app.quotes.Finished_Floor_Level" defaultMessage = "Finished Floor Level"/>
                        </Label>
                    </Col>
                </Row>
                <Row className = "ml-2">
                    <Col xs = "4">
                        <Label className = "col-form-label">
                            <FormattedMessage id = "app.quotes.Bay" defaultMessage = "Bay"/>
                        </Label>
                    </Col>
                    <Col xs = "3">
                        <Field component = "select" name = "selectedBayIndex" id = "selectedBayIndex"
                               className = "form-control form-control-sm text-right ml-1"
                        >
                            {baseBays && baseBays.map((bay, idx) => {
                                if (bay && !bay.annexeIndex){
                                    return <option key = {idx} value = {bay.bayIndex}>{bay.bayIndex + 1}</option>;
                                }
                                return null;
                            })
                            }
                        </Field>
                    </Col>
                </Row>
                {baseBays && baseBays[selectedBayIndex] ?
                    <React.Fragment>
                        <Row className = "ml-2">
                            <Col xs = "4">
                                <Label className = "col-form-label">
                                    <FormattedMessage id = "app.quotes.FFL" defaultMessage = "FFL"/>
                                </Label>
                            </Col>
                            <Col xs = "3">
                                <Field  name = {`bays[${selectedBayIndex}].finishedFloorLevel`} type = "number" component = {FieldInputPure}
                                        parse = {(value) => value && parseInt(value, 10)}
                                        className = "form-control form-control-sm text-right ml-1"
                                        onChange = {handleFFLChange}
                                />
                            </Col>
                            <Col xs = "5">
                                <Label className="col-form-label">
                                    <FormattedMessage id = "app.quotes.Range" defaultMessage = "Range"/>
                                    :{' '}
                                    <span className="font-weight-bold">
                                        FFL{' '}<FormattedNumber value = {garaportFFLMin} />
                                    </span>
                                    {' '}<FormattedMessage id = "app.quotes.to" defaultMessage = "to"/>{' '}
                                    <span className="font-weight-bold">
                                        FFL{' '}<FormattedNumber value = {garaportFFLMax} />
                                    </span>
                                </Label>
                            </Col>
                        </Row>
                        {hasLeftAwning ?
                            <Row className = "ml-2">
                                <Col xs = "4">
                                    <Label className = "col-form-label">
                                        {hasRightAwning ?
                                            <FormattedMessage id = "app.quotes.Left_Awning_FFL" defaultMessage = "Left Awning FFL"/> :
                                            <FormattedMessage id = "app.quotes.Awning_FFL" defaultMessage = "Awning FFL"/>
                                        }
                                    </Label>
                                </Col>
                                <Col xs = "3">
                                    {baseBays && baseBays[selectedBayIndex] &&
                                        <Field  name = {`bays[${selectedBayIndex}].leftAnnexeFinishedFloorLevel`} type = "number" component = {FieldInputPure}
                                                parse = {(value) => value && parseInt(value, 10)}
                                                className = "form-control form-control-sm text-right ml-1"
                                                onChange = {handleFFLChange}
                                        />
                                    }
                                </Col>
                                <Col xs = "5">
                                    {baseBays && baseBays[selectedBayIndex] &&
                                        <Label className="col-form-label">
                                            <FormattedMessage id = "app.quotes.Range" defaultMessage = "Range"/>
                                            :{' '}
                                            <span className="font-weight-bold">
                                                FFL{' '}<FormattedNumber value = {awningFFLMin} />
                                            </span>
                                            {' '}<FormattedMessage id = "app.quotes.to" defaultMessage = "to"/>{' '}
                                            <span className="font-weight-bold">
                                                FFL{' '}<FormattedNumber value = {awningFFLMax} />
                                            </span>
                                        </Label>
                                    }
                                </Col>
                            </Row> :
                            null
                        }
                        {hasRightAwning ?
                            <Row className = "ml-2">
                                <Col xs = "4">
                                    <Label className = "col-form-label">
                                        {hasLeftAwning ?
                                            <FormattedMessage id = "app.quotes.Right_Awning_FFL" defaultMessage = "Right Awning FFL"/> :
                                            <FormattedMessage id = "app.quotes.Awning_FFL" defaultMessage = "Awning FFL"/>
                                        }
                                    </Label>
                                </Col>
                                <Col xs = "3">
                                    {baseBays && baseBays[selectedBayIndex] &&
                                        <Field  name = {`bays[${selectedBayIndex}].rightAnnexeFinishedFloorLevel`} type = "number" component = {FieldInputPure}
                                                parse = {(value) => value && parseInt(value, 10)}
                                                className = "form-control form-control-sm text-right ml-1"
                                                onChange = {handleFFLChange}
                                        />
                                    }
                                </Col>
                                <Col xs = "5">
                                    {baseBays && baseBays[selectedBayIndex] &&
                                        <Label className="col-form-label">
                                            <FormattedMessage id = "app.quotes.Range" defaultMessage = "Range"/>
                                            :{' '}
                                            <span className="font-weight-bold">
                                                FFL{' '}<FormattedNumber value = {awningFFLMin} />
                                            </span>
                                            {' '}<FormattedMessage id = "app.quotes.to" defaultMessage = "to"/>{' '}
                                            <span className="font-weight-bold">
                                                FFL{' '}<FormattedNumber value = {awningFFLMax} />
                                            </span>
                                        </Label>
                                    }
                                </Col>
                            </Row> :
                            null
                        }
                    </React.Fragment>
                    : null
                }
            </React.Fragment>
        )
    }
};
export default CombinationBayFinishedFloorLevel;