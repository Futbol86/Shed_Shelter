import React from 'react';
import {Row, Col, CardHeader, Card, CardBody} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import ProfileFormContainer from '../containers/ProfileFormContainer';
import ProfilePasswordContainer from '../containers/ProfilePasswordContainer';
import DealerFormContainer from '../containers/DealerForm';

const ProfileComponent = ({userId}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h1>
                    <FormattedMessage id="app.users.Your_Profile" defaultMessage="Your Profile" />
                </h1>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12" sm="6">
                        <ProfileFormContainer />
                    </Col>
                    <Col xs="12" sm="6">
                        <ProfilePasswordContainer />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <DealerFormContainer userId={userId} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

export default ProfileComponent;