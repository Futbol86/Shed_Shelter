import React, {Component, useState} from 'react';
import { FormattedMessage } from 'react-intl';
// import Tabs from 'react-responsive-tabs';
// import 'react-responsive-tabs/styles.css';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import WallContainer from '../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/Wall';
import FurnitureItemContainer from '../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/FurnitureItem';
import TileContainer from '../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/Tile';
import GlassAndMirrorContainer from '../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/GlassAndMirror';
import BracketViewContainer from '../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/BracketView';

let tabItems = [];

class FurnitureDesignComponent extends React.Component{
    render() {
        const { 
            furnitureComponent, furnitureSettings, furnitureTabIndex, handleChangeTabs, handleSetViewDetail, handleRemoveAll, 
            handleSaveFurnitureComponent, handleExportBOMPDFFile
        } = this.props;

        const { 
            doSetFurnitureDrawingType, undoDrawWall,
            handleFurnitureItemIconDragStart, handleTileItemIconDragStart, handleGlassIconDragStart, handleMirrorIconDragStart,     
            duplicateFurnitureWall, duplicateFurnitureItem, duplicateTileItem, duplicateGlassItem, duplicateMirrorItem,
            removeFurnitureWall, removeFurnitureItem, removeTileItem, removeGlassItem, removeMirrorItem,
            deSelectedWall, deSelectedFurnitureItem, deSelectedTileItem, deSelectedGlassItem, deSelectedMirrorItem,
            addWallDoor, removeWallDoor, enableRotateFurnitureItem
        } = this.props;

        return (      
            <div className="wrapper side-panel-open">
                <button className="side-panel-toggle" type="button">
                    <span className="material-icons sp-icon-open">
                        keyboard_double_arrow_left
                    </span>
                    <span className="material-icons sp-icon-close">
                        keyboard_double_arrow_right
                    </span>
                </button>
                <div className="side-panel">
                    <Tabs defaultTab={furnitureTabIndex} vertical>
                        <TabPanel tabId="tab-walls" style={{width: '500px', maxHeight: '100vh', padding: '20px', overflow:'scroll'}}>
                            <WallContainer 
                                furnitureSettings={furnitureSettings}
                                doSetFurnitureDrawingType={doSetFurnitureDrawingType} 
                                undoDrawWall={undoDrawWall} 
                                duplicateFurnitureWall={duplicateFurnitureWall}
                                removeFurnitureWall={removeFurnitureWall} 
                                addWallDoor={addWallDoor} 
                                removeWallDoor={removeWallDoor}
                                deSelectedWall={deSelectedWall}
                            />
                        </TabPanel>
                        <TabPanel tabId="tab-items" style={{width: '500px', padding: '20px'}}>
                            <FurnitureItemContainer 
                                furnitureSettings={furnitureSettings}
                                handleFurnitureItemIconDragStart={handleFurnitureItemIconDragStart}
                                duplicateFurnitureItem={duplicateFurnitureItem}                                          
                                removeFurnitureItem={removeFurnitureItem}
                                deSelectedFurnitureItem={deSelectedFurnitureItem}
                                enableRotateFurnitureItem={enableRotateFurnitureItem}
                            />
                        </TabPanel>
                        <TabPanel tabId="tab-tiles" style={{width: '500px', padding: '20px'}}>
                            <TileContainer  
                                furnitureSettings={furnitureSettings}
                                handleTileItemIconDragStart={handleTileItemIconDragStart}
                                duplicateTileItem={duplicateTileItem}
                                removeTileItem={removeTileItem}
                                deSelectedTileItem={deSelectedTileItem}
                            />
                        </TabPanel>
                        <TabPanel tabId="tab-glass-mirrors" style={{width: '500px', padding: '20px'}}>
                            <GlassAndMirrorContainer 
                                furnitureSettings={furnitureSettings}
                                handleGlassIconDragStart={handleGlassIconDragStart}
                                handleMirrorIconDragStart={handleMirrorIconDragStart}
                                duplicateGlassItem={duplicateGlassItem} 
                                duplicateMirrorItem={duplicateMirrorItem}
                                removeGlassItem={removeGlassItem} 
                                removeMirrorItem={removeMirrorItem}
                                deSelectedGlassItem={deSelectedGlassItem}
                                deSelectedMirrorItem={deSelectedMirrorItem}
                            />
                        </TabPanel>
                        <TabPanel tabId="tab-bracket-views" style={{width: '500px', padding: '20px'}}>
                            <BracketViewContainer />
                        </TabPanel>
                        <TabList>
                            <Tab tabFor="tab-walls">
                                <span style={{writingMode: 'vertical-rl'}}>Walls</span>
                            </Tab>
                            <Tab tabFor="tab-items">
                                <span style={{writingMode: 'vertical-rl'}}>Items</span>  
                            </Tab>
                            <Tab tabFor="tab-tiles">
                                <span style={{writingMode: 'vertical-rl'}}>Tiles</span>   
                            </Tab>
                            <Tab tabFor="tab-glass-mirrors">
                                <span style={{writingMode: 'vertical-rl'}}>Glasses</span> 
                            </Tab>
                            <Tab tabFor="tab-bracket-views">
                                <span style={{writingMode: 'vertical-rl'}}>Brackets</span> 
                            </Tab>
                        </TabList>
                    </Tabs>
                    <div>
                        <button type="button" className="btn btn-primary mt-2 ml-2" onClick={handleSaveFurnitureComponent}>
                            <i className="fa fa-floppy-o" />{`  `}
                            {
                                furnitureComponent && furnitureComponent.id ? <FormattedMessage id="app.Update" defaultMessage="Update" />
                                                                            : <FormattedMessage id="app.Save" defaultMessage="Save" />
                            }
                        </button>
                        <button type="button" className='btn btn-secondary mt-2 ml-2' onClick={handleSetViewDetail}>
                            <i className="fa fa-info" />{`  `}<FormattedMessage id="app.drawing3D.Detail" defaultMessage="Detail"/>
                        </button>
                        <button type="button" className='btn btn-secondary mt-2 ml-2' onClick={handleExportBOMPDFFile}>
                            <i className="fa fa-file-excel-o" />{`  `}<FormattedMessage id="app.drawing3D.BOM" defaultMessage="BOM"/>
                        </button>
                        <button type="button" className="btn btn-danger mt-2 ml-2" onClick={handleRemoveAll}>
                            <i className="fa fa-trash" />{`  `}<FormattedMessage id="app.drawing3D.Remove_All" defaultMessage="Remove All" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FurnitureDesignComponent;