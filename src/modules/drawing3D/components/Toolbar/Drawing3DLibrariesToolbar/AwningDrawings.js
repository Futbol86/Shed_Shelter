import React, {Component, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';

const AwningDrawings = ({ awningDrawing }) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Awning_Drawings" defaultMessage="Awning Drawings"/></h4>
                </CardHeader>
                <CardBody>
                    <img src={`/awning_drawings/${awningDrawing.type}.png`} style={{zIndex: -100}} className="img-fluid" />
                </CardBody>
            </Card>
        </div>
    );
}

export default AwningDrawings;