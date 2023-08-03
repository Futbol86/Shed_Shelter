import React, {Component, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';

const BasePlateDrawings = ({ basePlateDrawing }) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Base_Plate_Drawings" defaultMessage="Base Plate Drawings"/></h4>
                </CardHeader>
                <CardBody>
                    <img src={`/base_plate_drawings/${basePlateDrawing.type}.jpg`} style={{zIndex: -100}} className="img-fluid" />
                </CardBody>
            </Card>
        </div>
    );
}

export default BasePlateDrawings;