import React from 'react';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";

const NoteListItem = ({ id, note, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>
                <span>{note.name}</span>
            </td>
            <td>
                <span>{note.description}</span>
            </td>
            <td>
                <span>{note.content}</span>
            </td>
            <td>
                <FormattedDate value={note.createdAt}/>
                {' '}
                <FormattedTime value={note.createdAt} />
            </td>
            <td>
                <FormattedDate value={note.updatedAt}/>
                {' '}
                <FormattedTime value={note.updatedAt} />
            </td>
            {note.changeSource !== 'app' ?
                <td align="right">
                    {note.hasReminder ?
                        <button className="btn btn-link pl-1 pt-0" type="button"
                                title={note.isTaskCompleted ? "Task completed" : "Edit Reminder"}
                                onClick={() => handleEditClick(note.id)}
                        >                  
                            <i className={note.isTaskCompleted ? "icon-check" : "icon-calendar"} />
                        </button>
                        : null
                    }

                    <button className="btn btn-link pl-1 pt-0" type="button"
                            title="Edit This Note"
                            onClick={() => handleEditClick(note.id)}
                    >                  
                        <i className="icon-pencil" />
                    </button>

                    <button className="btn btn-link pl-1 pt-0" type="button"
                            title="Delete This Note"
                            onClick={() => handleDeleteClick(note.id)}>
                        <i className="icon-minus"/>
                    </button>
                </td>
                : <td></td>
            }
        </tr>
    )
};

NoteListItem.propTypes = {
    handleEditClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    note: PropTypes.object
};

export default NoteListItem;