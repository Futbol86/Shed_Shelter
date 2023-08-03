import React, { Component } from 'react';
import { Field } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Form, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { 
    ORIENTATION_TYPES, FURNITURE_TILES, FURNITURE_TILE_TEXTURES
} from '../../../../constants';
import { FieldInputPure, FieldDropdownList, FieldRadioButtonGroup } from "../../../../../../components/common/Form";
import WallsColourDropDown from "../../../../../quotes/components/QuoteDetail/BuildingColour/WallsColourDropDown"
import TileInfoComponent from './TileInfo';

class TileComponent extends Component {
    render () {
        const { 
            selectedTileItem, isViewDetail, tileTypeFormData, tileItemFormData, 
            tileTextureFormData, tileOrientationFormData, tileColorFormData, 
            handleTileItemIconDragStart, removeTileItem, duplicateTileItem, deSelectedTileItem, 
            handleSubmit, submitting, pristine, invalid
        } = this.props;

        const isDisabledDragTile = !tileTypeFormData || !tileItemFormData || !tileTextureFormData ||
                                   !tileOrientationFormData || !tileColorFormData;
        
        let tileTypeList = [];
        Object.keys(FURNITURE_TILES).map(key => {
            tileTypeList.push({ code: key, name: FURNITURE_TILES[key].name, })
        });

        let tileItemList = [];
        const tileItemTypes = FURNITURE_TILES[tileTypeFormData] && FURNITURE_TILES[tileTypeFormData]["itemTypes"] || {};

        Object.keys(tileItemTypes).map(key => {
            tileItemList.push({ code: key, name: tileItemTypes[key].name })
        });

        let tileColorList = FURNITURE_TILES[tileTypeFormData] && FURNITURE_TILES[tileTypeFormData]["colors"];

        let tileTextureList = [];
        Object.keys(FURNITURE_TILE_TEXTURES).map(key => {
            tileTextureList.push({ code: key, name: FURNITURE_TILE_TEXTURES[key] })
        });

        return (
            <React.Fragment>
                {
                    !(selectedTileItem && isViewDetail) &&
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} className="mt-1">
                                    <strong><FormattedMessage id="app.drawing3D.Type" defaultMessage="Type"/>:</strong>
                                    <Field name="tileSettings.tileType" textField="name" valueField="code" titleOption="-- Select --"
                                        data={tileTypeList} component={FieldDropdownList} />
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs={12} className="mt-1">
                                    <strong><FormattedMessage id="app.drawing3D.Item" defaultMessage="Item"/>:</strong>
                                    <Field name="tileSettings.tileItem" textField="name" valueField="code" titleOption="-- Select --"
                                        data={tileItemList} component={FieldDropdownList} />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <strong><FormattedMessage id="app.drawing3D.Texture" defaultMessage="Texture"/>:</strong>
                                    <Field name="tileSettings.tileTexture" textField="name" valueField="code" titleOption="-- Select --"
                                        data={tileTextureList} component={FieldDropdownList} />
                                </Col>
                                {/* {
                                    tileTexture &&
                                    <Col xs={12} className="text-center" style={{padding: '10px'}}>
                                        <img src={`/assets/furnitures/textures/${tileTexture}.png`} style={{zIndex: -100, width: '100px', height: '100px'}}/> 
                                    </Col>
                                } */}
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <strong><FormattedMessage id="app.drawing3D.Color" defaultMessage="Color"/>:</strong>
                                    <Field name="tileSettings.tileColor" component={WallsColourDropDown} options={tileColorList}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <strong><FormattedMessage id="app.drawing3D.Orientation" defaultMessage="Orientation"/>:</strong>
                                    <Field name="tileSettings.tileOrientation" component={FieldRadioButtonGroup}
                                        items={ORIENTATION_TYPES} checked={true}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <strong><FormattedMessage id="app.drawing3D.Width" defaultMessage="Width (m)"/>:</strong>
                                    <Field name="tileSettings.tileWidth" type="number" component={FieldInputPure}
                                        parse={(value) => value && parseFloat(value)}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    {
                                       tileOrientationFormData === "horizontal" ?
                                            <strong><FormattedMessage id="app.drawing3D.Length" defaultMessage="Length (m)"/>:</strong>
                                          : <strong><FormattedMessage id="app.drawing3D.Height" defaultMessage="Height (m)"/>:</strong>
                                    }
                                    <Field name="tileSettings.tileLength" type="number" component={FieldInputPure}
                                        parse={(value) => value && parseFloat(value)}/>
                                </Col>
                            </Row>
                            <hr />
                            {
                                !isDisabledDragTile &&
                                <div className='text-center' style={{ width: '100%' }}>
                                        <img id={tileItemFormData} draggable={true}
                                                src={`/assets/furnitures/icons/tiles/${tileItemFormData}.png`} 
                                                title="Drag and Drop into scene"
                                                onDragStart={(evt) => handleTileItemIconDragStart(evt, tileTypeFormData, tileItemFormData)}
                                                style={{zIndex: -100, backgroundColor: '#656b83', cursor:'pointer'}}/>
                                </div>
                            }
                            <Row className="mt-4 mb-2">
                                <Col xs={12} className="d-flex justify-content-center">
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
                    selectedTileItem && isViewDetail &&
                    <TileInfoComponent selectedTileItem={selectedTileItem} 
                                       removeTileItem={removeTileItem}
                                       duplicateTileItem={duplicateTileItem} 
                                       deSelectedTileItem={deSelectedTileItem}/>
                }
            </React.Fragment>
        )
    }
};

export default TileComponent;