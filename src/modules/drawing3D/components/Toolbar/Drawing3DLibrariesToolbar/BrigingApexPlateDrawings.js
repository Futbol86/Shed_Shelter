import React, {Component, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';

const BrigingApexPlateDrawings = ({ brigingApexPlateDrawing }) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Briging_Apex_Plate_Drawings" defaultMessage="Briging Apex Plate Drawings"/></h4>
                </CardHeader>
                <CardBody>
                    <img src={`/briging_apex_plate_drawings/${brigingApexPlateDrawing.type}.jpg`} style={{zIndex: -100}} className="img-fluid" />
                </CardBody>
            </Card>
        </div>
    );
}

export default BrigingApexPlateDrawings;