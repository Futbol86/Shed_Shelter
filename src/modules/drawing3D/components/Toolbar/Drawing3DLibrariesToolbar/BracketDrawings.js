import React, {Component, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';

const BracketDrawings = ({ bracketDrawing }) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Bracket_Drawings" defaultMessage="Bracket Drawings"/></h4>
                </CardHeader>
                <CardBody>
                    <img src={`/bracket_drawings/${bracketDrawing.type}.jpg`} style={{zIndex: -100}} className="img-fluid" />
                </CardBody>
            </Card>
        </div>
    );
}

export default BracketDrawings;