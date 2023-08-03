import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

const AuthRightCardComponent  = () => (
    <Card className="text-white bg-sns-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
        <CardBody className="text-center">
            <div>
                <h2><FormattedMessage id="app.auth.right_panel_Heading" defaultMessage="National Sheds and Shelters" /></h2>
                <p />
                <p><FormattedMessage id="app.auth.right_panel_Paragraph1" defaultMessage="You need to provide credential information before using the system." /></p>
                <p><FormattedMessage id="app.auth.right_panel_Paragraph2" defaultMessage="Please contact the system administrator to get your access." /></p>
            </div>
        </CardBody>
    </Card>
);

export default AuthRightCardComponent;