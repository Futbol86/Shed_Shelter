import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';

class WallType extends React.Component{
    render() {
        const { 
            wallTypesArr, selectedBayWall, endWallOffsetArr,
            handleBayWallChange, handleOffsetChange,
            hasLeftAnnexe, isEditing, braceUse,
            isEndWall, isLeftAwningEndWall, isRightAwningEndWall
        } = this.props;
        let offsetGrid = "";
        if (isLeftAwningEndWall) {
            offsetGrid = "A";
        } else if (isEndWall && hasLeftAnnexe) {
            offsetGrid = "B";
        } else if (isEndWall) {
            offsetGrid = "A";
        } else if (isRightAwningEndWall && hasLeftAnnexe) {
            offsetGrid = "C";
        } else if (isRightAwningEndWall) {
            offsetGrid = "B";
        }
        
        return (
            <Row>
                <Col md={2} xs={4}>
                    <Label className="col-form-label">
                        <FormattedMessage id="app.quotes.Wall" defaultMessage="Wall" />
                    </Label>
                </Col>

                <Col md={4} xs={8}>
                    <Label className="col-form-label d-flex flex-row">
                        <Field component="select" name="bayWallType"
                                className="form-control form-control-sm ml-1"
                                onChange={handleBayWallChange}
                                disabled={isEditing}
                        >
                            {wallTypesArr.map((item, idx) =>
                                <option key={idx} value={item.id}>
                                    {item.name}
                                </option>
                            )}
                        </Field>
                    </Label>
                </Col>

                <Col md={6} xs={12}>
                    <Row>
                        <Col xs={6}>
                            <Label className="col-form-label"
                                    dangerouslySetInnerHTML={{__html: selectedBayWall && selectedBayWall.desc1}}
                            />
                        </Col>
                        {!braceUse &&
                            <Col xs={6}>
                                <Label className="col-form-label">
                                    {selectedBayWall && selectedBayWall.desc2}
                                </Label>
                            </Col>
                        }
                        {braceUse && (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) && endWallOffsetArr && endWallOffsetArr.length > 0 &&
                            <Col xs={6}>
                                <Label className="col-form-label d-flex flex-row justify-content-between">
                                    <span>
                                        <FormattedMessage id="app.quotes.Offset_from_grid"
                                                            values={{grid: offsetGrid}}
                                                            defaultMessage="Offset from grid {grid}"
                                        />
                                    </span>
                                    <Field component="select" name="endWallOffset"
                                            parse={(value) => value && parseInt(value, 10)}
                                            className="form-control form-control-sm text-right ml-1" style={{width: '100px'}}
                                            onChange = {handleOffsetChange}
                                    >
                                        {endWallOffsetArr.map((offset, idx) => 
                                             <option key={idx} value={offset}>
                                                 {Math.ceil(offset)}
                                            </option>
                                        )}
                                    </Field>
                                </Label>
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
    )};
}

export default WallType;