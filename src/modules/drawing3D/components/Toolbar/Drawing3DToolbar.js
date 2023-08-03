import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';

import ColorComponent from './Drawing3DToolbar/Colors';
import SizeComponent from './Drawing3DToolbar/Size';
import ComponentDragComponent from './Drawing3DToolbar/ComponentDrags';
import FurnitureDesignContainer from '../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign';

const Drawing3DToolBar = (props) => {
    return (
        <React.Fragment>
            {/* <Row>
                <Col xs={12}>
                    <ComponentDragComponent />
                </Col>
            </Row> */}
            {/* <Row>
                <Col xs={12}>
                    <ColorComponent />
                </Col>
            </Row> */}
            {/* <Row>
                <Col xs={12}>
                    <SizeComponent handleAddBay={handleAddBay} handleRemoveBay={handleRemoveBay}/>
                </Col>
            </Row> */}
            <Row>
                <Col xs={12}>
                    <FurnitureDesignContainer {...props}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Drawing3DToolBar;