import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import { isEmpty } from 'lodash';

import Pagination from '../../../../components/common/Pagination';

import OrderNoteAdd from "../../containers/Order/OrderNoteAdd";

class OrderNote extends Component {
    render() {
        const { notes, userId, isAdmin, isLocked, uploadRootURL, handleDeleteClick, loadEditingNote, pagination, onChangePage} = this.props;

        return (     
            <Card>
                <CardHeader className="pl-3">
                    <strong><FormattedMessage id="app.order.Order_Note" defaultMessage="Order Note" /></strong>
                </CardHeader>
                <CardBody className="pb-2 pt-2">
                    <Row>
                        <Col xs="12" md="3">
                            <OrderNoteAdd {...this.props} />
                        </Col>
                        <Col xs="12" md="9">
                            <Row>
                                <Col xs="12" md="12">
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <FormattedMessage id="app.order.From" defaultMessage="From" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.order.To" defaultMessage="To" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.order.Note" defaultMessage="Note" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.order.Files" defaultMessage="Files" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.order.Date" defaultMessage="Date" />
                                                </th>
                                                <th align="center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(notes && notes.length > 0)
                                                ? notes.map((note, idx) => (
                                                    <tr key={idx}>
                                                        <td>
                                                            <div>
                                                                {`${note.fromCompany ? note.fromCompany : note.fromUserName}`}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {`${note.toCompany ? note.toCompany : note.toUserName}`}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {`${note.content}`}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {note.fileRelPaths && !isEmpty(note.fileRelPaths) && <ul style={{listStyleType: "none", paddingLeft: 0, marginBottom: 0}}>
                                                                {note.fileRelPaths.map((item, idx) => (
                                                                    <li key={idx}>
                                                                        <a href={`${uploadRootURL}/${item}`} className="pl-1 pt-0" title="Download File" target="_blank">
                                                                            <i className="icon-cloud-download" />
                                                                        </a> {item.substring(10)}
                                                                    </li>
                                                                ))}
                                                            </ul>}
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <FormattedDate value={`${note.updatedAt}`} />
                                                                {' '}
                                                                <FormattedTime value={`${note.updatedAt}`} />
                                                            </div>
                                                        </td>
                                                        <td align="center">
                                                            {(isAdmin || (userId + '' === note.fromUserId + '')) && !isLocked ?
                                                                <div>
                                                                    <button type="button" className="btn btn-link pl-1 pt-0" title="Edit Note" onClick={() => loadEditingNote(note)}>
                                                                        <i className="icon-pencil" />
                                                                    </button>
                                                                    <button type="button" className="btn btn-link pl-2 pt-0" title="Delete This Note" onClick={() => handleDeleteClick(note.id)}>
                                                                        <i className="icon-minus" />
                                                                    </button>
                                                                </div> : null
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                                : <tr><td colSpan={6}><FormattedMessage id="app.order.No_Note_Found" defaultMessage="No Note Found!" /></td></tr>
                                            }
                                        </tbody>
                                    </Table>

                                    <Pagination pagination={pagination} onChangePage={onChangePage} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default OrderNote;