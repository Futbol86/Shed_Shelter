import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {WALL_LEFT_INDEX} from '../../../constants';

class CombinationBayEndWallOption extends React.Component{
    render() {
        const {hasWallGrids, isAnnexeLeft, selectedGrid, handleGridChange, 
            handleIsGaraportFlashingChange, handleSheetingDirectionChange, handleSheetSideChange
        } = this.props;
        const selectedBayIndex = selectedGrid.bayIndex;
        const selectedGridIndex = selectedBayIndex + (selectedGrid.wallIndex === WALL_LEFT_INDEX ? 1 : 2);
        const isPartitionLeft = (selectedGrid.wallIndex === WALL_LEFT_INDEX);
        const isInternalWall = hasWallGrids.length > 0 && 
            (selectedGrid.bayIndex !== hasWallGrids[0].bayIndex || selectedGrid.wallIndex !== hasWallGrids[0].wallIndex) &&
            (selectedGrid.bayIndex !== hasWallGrids[hasWallGrids.length - 1].bayIndex || selectedGrid.wallIndex !== hasWallGrids[hasWallGrids.length - 1].wallIndex)
        return(
            <React.Fragment>                
                <Row>
                    <Col xs = "12">
                        <Label className = "col-form-label font-weight-bold">
                            <FormattedMessage id = "app.quotes.End_Wall_and_Internal_Wall" defaultMessage = "End Wall and Internal Wall"/>
                        </Label>
                    </Col>
                </Row>
                <Row className = "ml-2">
                    <Col xs = "4">
                        <Label className = "col-form-label">
                            <FormattedMessage id = "app.quotes.Grid" defaultMessage = "Grid"/>
                        </Label>
                    </Col>
                    <Col xs = "3">
                        <Field component = "select" name = "selectedGridIndex"
                            onChange = {handleGridChange}
                            className="form-control form-control-sm ml-1" >
                        >
                            {hasWallGrids && hasWallGrids.map(grid => {
                                if (grid){
                                    return <option key = {grid.id} value = {grid.id}>{grid.id}</option>;
                                }
                                return null;
                            })
                            }
                        </Field>
                    </Col>
                    <Col xs = "5">
                        <Label className = "col-form-label">
                            {selectedGrid && selectedGrid.desc}
                        </Label>
                    </Col>
                </Row>
                <Row className = "ml-2">
                    <Col xs = "4">
                        <Label className = "col-form-label">
                            <FormattedMessage id = "app.quotes.Garaport_Flashing" defaultMessage = "Garaport Flashing"/>
                        </Label>
                    </Col>
                    <Col xs = "3">
                        <Field component="select"
                            name={`bays[${selectedBayIndex}].${isPartitionLeft ? 'partitionLeftIsGaraportFlashing' : 'partitionRightIsGaraportFlashing'}`}
                            onChange={handleIsGaraportFlashingChange}
                            className="form-control form-control-sm ml-1"
                        >
                            <option value='0'>No</option>
                            <option value='1'>Yes</option>
                        </Field>
                    </Col>
                </Row>
                <Row className = "ml-2">
                    <Col xs = "4">
                        <Label className = "col-form-label">
                            <FormattedMessage id = "app.quotes.Sheet_Direction" defaultMessage = "Sheet Direction"/>
                        </Label>
                    </Col>
                    <Col xs = "3">
                        <Field component = "select"
                            name = {`bays[${selectedBayIndex}].${isPartitionLeft ? 'partitionLeftSheetingDirection' : 'partitionRightSheetingDirection'}`}
                            onChange = {handleSheetingDirectionChange}
                            className = "form-control form-control-sm ml-1"
                        >
                            <FormattedMessage id = "app.quotes.From_Grid"
                                            defaultMessage = "From Grid {grid}"
                                            values={{grid: isAnnexeLeft ? "B" : "A"}}
                            >
                                {message => <option value = {1}>{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id = "app.quotes.From_Grid"
                                            defaultMessage = "From Grid {grid}"
                                            values={{grid: isAnnexeLeft ? "C" : "B"}}
                            >
                                {message => <option value = {2}>{message}</option>}
                            </FormattedMessage>
                        </Field>
                    </Col>
                </Row>
                {isInternalWall &&
                    <Row className = "ml-2">
                        <Col xs = "4">
                            <Label className = "col-form-label">
                                <FormattedMessage id = "app.quotes.Sheet_Side" defaultMessage = "Sheet Side"/>
                            </Label>
                        </Col>
                        <Col xs = "3">
                            <Field component = "select"
                                name = {`bays[${selectedBayIndex}].${isPartitionLeft ? 'partitionLeftSheetSide' : 'partitionRightSheetSide'}`}
                                onChange = {handleSheetSideChange}
                                className = "form-control form-control-sm ml-1"
                            >
                                <FormattedMessage id = "app.quotes.Side_Grid"
                                                defaultMessage = "Side Grid {grid}"
                                                values={{grid: selectedGridIndex - 1}}
                                >
                                    {message => <option value = {selectedGridIndex - 1}>{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id = "app.quotes.Side_Grid"
                                                defaultMessage = "From Grid {grid}"
                                                values={{grid: selectedGridIndex + 1}}
                                >
                                    {message => <option value = {selectedGridIndex + 1}>{message}</option>}
                                </FormattedMessage>
                            </Field>
                        </Col>
                    </Row>
                }
            </React.Fragment>
        )
    }
};
export default CombinationBayEndWallOption;