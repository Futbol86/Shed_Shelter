import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { FURNITURE_ITEMS } from '../../../../constants';

const FurnitureItemInfoComponent = ({ 
        selectedFurnitureItem, removeFurnitureItem, duplicateFurnitureItem, deSelectedFurnitureItem,
        enableRotateFurnitureItem 
    }) => {
    const { group, name, width, length, height } = selectedFurnitureItem && selectedFurnitureItem.informations || {}
    let groupName = FURNITURE_ITEMS[group] ? FURNITURE_ITEMS[group]["name"] : "None";

    return (
        <React.Fragment>
            <Row className="mt-2">
                <Col md={12} className="d-flex flex-wrap justify-content-end">
                    <Button color="" onClick={deSelectedFurnitureItem}>
                        <img src={`/assets/furnitures/icons/toolbars/back.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Back'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Back" defaultMessage="Back"/>
                    </Button>
                    <Button color="" onClick={enableRotateFurnitureItem}>
                        <img src={`/assets/furnitures/icons/toolbars/rotate.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Rotate'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Rotate" defaultMessage="Rotate"/>
                    </Button>
                    <Button color="" onClick={duplicateFurnitureItem}>
                        <img src={`/assets/furnitures/icons/toolbars/duplicate.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Duplicate'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Duplicate" defaultMessage="Duplicate"/>
                    </Button>
                    <Button color="" onClick={removeFurnitureItem}>
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
                            <u><FormattedMessage id="app.drawing3D.Item_Detail" defaultMessage="Item Detail"/></u>
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
                    {groupName}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Width" defaultMessage="Width (mm)"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={width}/>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Length" defaultMessage="Length (mm)"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={length}/>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Height" defaultMessage="Height (mm)"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={height}/>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default FurnitureItemInfoComponent;