import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Dropzone from 'react-dropzone';

const ProfileChangeAvatar = ({onDrop, files, currentAvatar}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.users.Change_Your_Avatar" defaultMessage="Change Your Avatar" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12" md="6">
                        <img src={(!files[0]) ? currentAvatar : files[0].preview} className="img-fluid img-avatar" alt="Your Avatar" />
                    </Col>
                    <Col xs="12" md="6" className="d-flex justify-content-center">
                        <div className="dropzone">
                            <Dropzone onDrop={onDrop} accept='image/*' multiple={false}>
                                <div className="text-center">
                                    <p>Drop your Image file here</p>
                                    <p>Remember to click on Save when you are OK!</p>
                                </div>
                            </Dropzone>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="d-flex justify-content-center">
                        <Button color="primary">
                            Save
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

export default ProfileChangeAvatar;