import React from 'react';
import { FormattedNumber } from 'react-intl';
import { Row, Col, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FURNITURE_TILES } from '../../../../constants';

const TileInfoComponent = ({ selectedTileItem, removeTileItem, duplicateTileItem, deSelectedTileItem }) => {
    const { name } = selectedTileItem;
    const { 
        group, type, tileColor, tileOrientation, tileWidth, tileLength 
    } = selectedTileItem && selectedTileItem.informations || {};

    return (
        <React.Fragment>
            <Row className="mt-2">
                <Col md={12} className="d-flex flex-wrap justify-content-end">
                    <Button color="" onClick={deSelectedTileItem}>
                        <img src={`/assets/furnitures/icons/toolbars/back.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Back'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Back" defaultMessage="Back"/>
                    </Button>
                    <Button color="" onClick={duplicateTileItem}>
                        <img src={`/assets/furnitures/icons/toolbars/duplicate.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Duplicate'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Duplicate" defaultMessage="Duplicate"/>
                    </Button>
                    <Button color="" onClick={removeTileItem}>
                        <img src={`/assets/furnitures/icons/toolbars/remove.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Remove'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Remove" defaultMessage="Remove"/>
                    </Button>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={12}>
                    <h5>
                        <strong>
                            <u><FormattedMessage id="app.drawing3D.Tile_Detail" defaultMessage="Tile Detail"/></u>
                        </strong>
                    </h5>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Name" defaultMessage="Name"/></strong>
                </Col>
                <Col md={6}>
                    {name}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Type" defaultMessage="Type"/></strong>
                </Col>
                <Col md={6}>
                    {FURNITURE_TILES[group]["name"]}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Item" defaultMessage="Item"/></strong>
                </Col>
                <Col md={6}>
                    {FURNITURE_TILES[group]["itemTypes"][type]["name"]}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Color" defaultMessage="Color"/></strong>
                </Col>
                <Col md={6}>
                    <div style={{backgroundColor: `${tileColor}`, width: '20px', height: '20px', border: '1px solid #000000'}}></div>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Orientation" defaultMessage="Orientation"/></strong>
                </Col>
                <Col md={6}>
                    {tileOrientation}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Width" defaultMessage="Width"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={tileWidth}/>{` m`}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Length" defaultMessage="Length"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={tileLength}/>{` m`}
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default TileInfoComponent;