import React, {Component} from 'react';
import { Field } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {Form, Row, Col, Button} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {FURNITURE_ITEMS} from '../../../../constants';
import FurnitureItemInfoComponent from './FurnitureItemInfo';
import { FieldDropdownList } from "../../../../../../components/common/Form";

class FurnitureItemComponent extends Component {
    render() {
        const { 
            furnitureItemGroupType, selectedFurnitureItem, isViewDetail,
            handleFurnitureItemIconDragStart, removeFurnitureItem, duplicateFurnitureItem, deSelectedFurnitureItem,
            enableRotateFurnitureItem, handleSubmit, submitting, pristine, invalid
        } = this.props;

        let furnitureItemGroupTypeList = [];

        Object.keys(FURNITURE_ITEMS).map(key => {
            furnitureItemGroupTypeList.push({ code: key, name: FURNITURE_ITEMS[key].name, })
        });

        return (
            <React.Fragment>
                {
                    !(selectedFurnitureItem && isViewDetail) &&
                    <div style={{maxHeight: '70vh', overflow: 'scroll'}}>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} className="mt-1">
                                    <strong><FormattedMessage id="app.drawing3D.Select_Type" defaultMessage="Select Type"/>:</strong>
                                    <Field name="itemSettings.furnitureItemGroupType" className="mb-4"
                                        textField="name" valueField="code" titleOption="-- Select --"
                                        data={furnitureItemGroupTypeList} component={FieldDropdownList} />
                                </Col>
                            </Row>
                            {
                                FURNITURE_ITEMS[furnitureItemGroupType] && FURNITURE_ITEMS[furnitureItemGroupType].itemTypes.map((itemType, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                            <div className='text-center' style={{ width: '100%' }}>
                                                <img id={itemType.code} draggable={true} 
                                                    src={`/assets/furnitures/icons/${furnitureItemGroupType}/${itemType.code}.png`} 
                                                    title="Drag and Drop into scene"
                                                    style={{zIndex: -100, cursor:'pointer'}}
                                                    onDragStart={(evt) => handleFurnitureItemIconDragStart(evt, furnitureItemGroupType, itemType.code, itemType.name)}/> 
                                                <div><strong>{itemType.name}</strong></div>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    )
                                })
                            }
                            <Row className="mt-2 mb-2">
                                <Col md={12} xs={12} className="d-flex justify-content-center">
                                    <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                            data-spinner-lines={12} className="btn btn-dark" type="submit"
                                            loading={submitting} disabled={submitting || invalid || pristine}>
                                        <i className="icon-note" />{` `}
                                        <FormattedMessage id="app.drawing3D.Save_Choice" defaultMessage="Save Choice" />
                                    </LaddaButton>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                }
                {
                    selectedFurnitureItem && isViewDetail && 
                    <FurnitureItemInfoComponent selectedFurnitureItem={selectedFurnitureItem} 
                                                removeFurnitureItem={removeFurnitureItem}
                                                duplicateFurnitureItem={duplicateFurnitureItem}
                                                deSelectedFurnitureItem={deSelectedFurnitureItem}
                                                enableRotateFurnitureItem={enableRotateFurnitureItem}/>
                }
            </React.Fragment>
        )
    }
};

export default FurnitureItemComponent;