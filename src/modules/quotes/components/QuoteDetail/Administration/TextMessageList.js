import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import TextMessageListItem from "./TextMessageListItem";
import Pagination from '../../../../../components/common/Pagination';

const TextMessageList = ({displayedTextMessages, pagination, onChangePage}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <strong>
                        <FormattedMessage id="app.quotes.Text_Message_List" defaultMessage='Text Message List' />
                    </strong>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Table responsive striped>
                                <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id="app.ID" defaultMessage='ID' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Sender_Identity" defaultMessage='Sender Identity' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Mobile" defaultMessage='Mobile' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Content" defaultMessage='Content' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Sent_Status" defaultMessage='Sent Status' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Date" defaultMessage='Date' />
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {(displayedTextMessages && displayedTextMessages.length > 0)
                                        ? displayedTextMessages.map((textMessage, idx) => (
                                            <TextMessageListItem   key={idx} textMessage={textMessage} />
                                        ))
                                        : <tr><td colSpan={6}><FormattedMessage id="app.quotes.No_Text_Message_Found" defaultMessage='No Text Message Found' /></td></tr>
                                    }
                                </tbody>
                            </Table>
                            {(pagination && pagination.total > pagination.limit) ?
                                <Pagination pagination={pagination} onChangePage={onChangePage} />
                                : null
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default TextMessageList;