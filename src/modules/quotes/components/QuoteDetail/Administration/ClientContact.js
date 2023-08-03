import React from 'react';
import { Row, Col } from 'reactstrap';
import ClientContactDetail from "../../../../clients/components/ClientDetail/ClientContactDetail";

const ClientContact = ({ client }) => {
    return (
        <Row>
            {(client.contact1) &&
            <Col xs="12" lg={(client.type === 'sing') ? 12 : 6}>
                <ClientContactDetail label="Contact 1"
                                    isCorp={client.type === 'corp'} contact={client.contact1} />
            </Col>
            }
            {(client.contact2) &&
            <Col xs="12" lg="6">
                <ClientContactDetail label="Contact 2"
                                    isCorp={client.type === 'corp'} contact={client.contact2} />
            </Col>
            }
            {(client.contact3) &&
            <Col xs="12" lg="6">
                <ClientContactDetail label="Contact 3"
                                    isCorp={client.type === 'corp'} contact={client.contact3} />
            </Col>
            }
            {(client.contact4) &&
            <Col xs="12" lg="6">
                <ClientContactDetail label="Contact 4"
                                    isCorp={client.type === 'corp'} contact={client.contact4} />
            </Col>
            }
        </Row>
    );
}

export default ClientContact;