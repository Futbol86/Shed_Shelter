import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import {Form, Row, Col, Collapse, Card, CardHeader, CardBody} from 'reactstrap';
import {QUOTES_DOOR_TYPES, ROOF_TYPES} from '../../../constants';

const ComponentDrags = ({}) => {
    return (
        <div className="animated fadeIn">
            <div style={{marginTop: '20rem'}}>
                <Card>
                    <CardBody>
                        {/* <Row>
                            {QUOTES_DOOR_TYPES.map((door, idx) => {
                                return (
                                    <Col md="12" className="mt-2" key={idx}>
                                        <button key={idx} type="button" className="mr-1" style={{zIndex: -100}}>
                                            <img id={door.code} src={`/assets/${door.imgSrc}`} 
                                                 style={{zIndex: -100}}
                                                 className="img-fluid" />{door.name}
                                        </button>
                                    </Col>
                                );
                            })}
                        </Row> */}
                        <Row className="mt-4">
                            {ROOF_TYPES.map((roof, idx) => {
                                return (
                                    <Col md="12" className="mt-2" key={idx}>
                                        {/* <button key={idx} type="button" className="mr-1" style={{zIndex: -100}}> */}
                                            <img id={roof.code} src={`/assets/${roof.imgSrc}`} 
                                                 style={{zIndex: -100}}
                                                 className="img-fluid" />{roof.name}
                                        {/* </button> */}
                                    </Col>
                                );
                            })}
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ComponentDrags;