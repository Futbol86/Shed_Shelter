import React from 'react';
import {NavLink} from 'react-router-dom';
import {Card, CardBody, Button} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

const DashboardActions = () => (
    <Card style={{borderColor: 'red'}}>
        <CardBody className="d-flex flex-sm-row flex-column justify-content-around">
            <NavLink to={`/quotes/add`} className="m-1">
                <Button color="red">
                    <span className="font-weight-bold text-uppercase">
                        <i className="icon-doc"/> <FormattedMessage id="app.dashboard.New_Quote" defaultMessage="New Quote" />
                    </span>
                </Button>
            </NavLink>

            <NavLink to={`/quotes/list`} className="m-1">
                <Button color="primary">
                    <span className="font-weight-bold text-uppercase">
                        <i className="icon-list"/> <FormattedMessage id="app.dashboard.Manage_Quotes" defaultMessage="Manage Quotes" />
                    </span>
                </Button>
            </NavLink>

            <NavLink to={`/clients/add`} className="m-1">
                <Button color="red">
                    <span className="font-weight-bold text-uppercase">
                        <i className="icon-user"/> <FormattedMessage id="app.dashboard.New_Client" defaultMessage="New Client" />
                    </span>
                </Button>
            </NavLink>

            <NavLink to={`/clients/list`} className="m-1">
                <Button color="primary">
                    <span className="font-weight-bold text-uppercase">
                        <i className="icon-people"/> <FormattedMessage id="app.dashboard.Manage_Clients" defaultMessage="Manage Clients" />
                    </span>
                </Button>
            </NavLink>
        </CardBody>
    </Card>
);

export default DashboardActions;