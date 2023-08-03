import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {FormattedMessage} from 'react-intl';


const DoorsAndWindows = (props) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Doors_and_Windows" defaultMessage="Doors and Windows" /></strong>
            </CardHeader>
            <CardBody className="p-2">

            </CardBody>
        </Card>
    );
};

export default DoorsAndWindows;