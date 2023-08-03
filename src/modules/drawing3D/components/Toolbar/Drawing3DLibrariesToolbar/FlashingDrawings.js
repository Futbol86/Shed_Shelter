import React, {Component, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';

const FlashingDrawings = ({ flashingDrawing }) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Flashing_Drawings" defaultMessage="Flashing Drawings"/></h4>
                </CardHeader>
                <CardBody>
                    <img src={`/flashing_drawings/${flashingDrawing.type}.jpg`} style={{zIndex: -100}} className="img-fluid" />
                </CardBody>
            </Card>
        </div>
    );
}

export default FlashingDrawings;