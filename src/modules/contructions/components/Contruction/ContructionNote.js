import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import { isEmpty } from 'lodash';
import Modal from "react-modal";
import Pagination from '../../../../components/common/Pagination';
import ContructionNoteAdd from "../../containers/Contruction/ContructionNoteAdd";
import PDFModal from '../../containers/Contruction/PDFModal';
import {API_SUB_URL} from '../../constants';

class ContructionNote extends Component {
    render() {
        const { notes, userId, isAdmin, isLocked, uploadRootURL, currentModalId, handleDeleteClick, loadEditingNote, pagination, onChangePage, handleModalChange} = this.props;
        return (     
            <Card>
                <CardHeader className="pl-3">
                    <strong><FormattedMessage id="app.contruction.Contruction_Note" defaultMessage="Contruction Note" /></strong>
                    <div className="card-actions">
                        <a href="#" onClick={() => handleModalChange(2-currentModalId)}>
                            <i className="icon-printer" title="Print" />
                        </a>

                        <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                            isOpen={currentModalId === 2}
                            onRequestClose={() => handleModalChange(0)}
                            contentLabel="Contruction Notes"
                            style={{content: {outline: 0}}}
                        >
                            <PDFModal
                                handleModalClose={() => handleModalChange(0)}
                            />
                        </Modal>
                    </div>
                </CardHeader>
                <CardBody className="pb-2 pt-2">
                    <Row>
                        <Col xs="12" md="3">
                            <ContructionNoteAdd {...this.props} />
                        </Col>
                        <Col xs="12" md="9">
                            <Row>
                                <Col xs="12" md="12">
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <FormattedMessage id="app.contruction.From" defaultMessage="From" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.contruction.To" defaultMessage="To" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.contruction.Note" defaultMessage="Note" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.contruction.Files" defaultMessage="Files" />
                                                </th>
                                                <th>
                                                    <FormattedMessage id="app.contruction.Date" defaultMessage="Date" />
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
                                                                {`${note.fromUserDetails.company ? 
                                                                    note.fromUserDetails.company.tradesRegisteredName :
                                                                    note.fromUserDetails.user.firstName + ' ' + note.fromUserDetails.user.lastName }`}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {`${note.toUserDetails.company ? 
                                                                    note.toUserDetails.company.tradesRegisteredName :
                                                                    note.toUserDetails.user.firstName + ' ' + note.toUserDetails.user.lastName }`}
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
                                                                        <a href={`${uploadRootURL}${API_SUB_URL}/${item}`} className="pl-1 pt-0" title="Download File" target="_blank">
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
                                                : <tr><td colSpan={6}><FormattedMessage id="app.contruction.No_Note_Found" defaultMessage="No Note Found!" /></td></tr>
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

export default ContructionNote;