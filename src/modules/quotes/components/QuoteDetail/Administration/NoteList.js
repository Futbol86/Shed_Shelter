import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import NoteListItem from "./NoteListItem";
import Pagination from '../../../../../components/common/Pagination';
import PropTypes from "prop-types";

const NoteList = ({notes, handleNoteDeleteClick, handleNoteEditClick, pagination, onChangePage}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <strong>
                        <FormattedMessage id="app.quotes.Note_List" defaultMessage='Note List' />
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
                                        <FormattedMessage id="app.quotes.User_Name" defaultMessage='User Name' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Event_Description" defaultMessage='Event Description' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Content" defaultMessage='Content' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Created_Date" defaultMessage='Created Date' />
                                    </th>
                                    <th>
                                        <FormattedMessage id="app.quotes.Updated_Date" defaultMessage='Updated Date' />
                                    </th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {(notes && notes.length) ?
                                        notes.map((note, idx) => (
                                            <NoteListItem   key={idx}
                                                            note={note}
                                                            id={pagination ? pagination.total - pagination.skip - idx : 0}
                                                            handleEditClick={handleNoteEditClick}
                                                            handleDeleteClick={handleNoteDeleteClick}
                                            />
                                        ))
                                        : <tr><td colSpan={7}><FormattedMessage id="app.quotes.No_Note_Found" defaultMessage='No Note Found' /></td></tr>
                                    }
                                </tbody>
                            </Table>

                            {pagination && pagination.total > pagination.limit ?
                                <Pagination pagination={pagination} onChangePage={onChangePage} /> : null
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

NoteList.propTypes = {
    handleNoteDeleteClick: PropTypes.func,
    handleNoteEditClick: PropTypes.func,
    onChangePage: PropTypes.func
};

export default NoteList;