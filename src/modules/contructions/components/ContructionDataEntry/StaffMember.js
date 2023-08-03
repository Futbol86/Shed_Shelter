import React from 'react';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-modal';

import AddEditStaffModal from '../../containers/ContructionDataEntry/AddEditStaffModal';

const StaffMember = ({ staffs, handleEditStaffClick, handleDeleteStaffClick, handleModalChange, handleModalClose, currentModalId }) => {
    return (
        <Card>
            <CardHeader>
                <b><FormattedMessage id="app.contruction.Staff_Contact_Register" defaultMessage="Staff Contact Register" /></b>
                <div className="card-actions">
                    <a href="#" onClick={() => handleModalChange(1-currentModalId)}>
                        <i className="icon-plus" title="Print" />
                    </a>

                    <Modal className="Modal__Bootstrap modal-dialog modal-md"
                        isOpen={currentModalId > 0}
                        contentLabel="Staff"
                        style={{content: {outline: 0}}}
                    >
                        <AddEditStaffModal staffs={staffs} handleModalClose={handleModalClose} />
                    </Modal>
                </div>
            </CardHeader>
            <CardBody>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="app.contruction.Staff_Name" defaultMessage="Staff Name" /></th>
                            <th><FormattedMessage id="app.contruction.Position" defaultMessage="Position" /></th>
                            <th><FormattedMessage id="app.contruction.Contact" defaultMessage="Contact" /></th>
                            <th><FormattedMessage id="app.contruction.Next_Of_Kin" defaultMessage="Next Of Kin" /></th>
                            <th><FormattedMessage id="app.contruction.Relationship" defaultMessage="Relationship" /></th>
                            <th align="center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs && staffs.length > 0 ?
                            staffs.map((staff, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{staff.name}</td>
                                        <td>{staff.position}</td>
                                        <td>{staff.contact}</td>
                                        <td>{staff.nextOfKin}</td>
                                        <td>{staff.relationship}</td>
                                        <td align="right">
                                            <button className="btn btn-link pl-1 pt-0" title="Edit This Staff" type="button"
                                                    onClick={() => handleEditStaffClick(idx + 1)}>
                                                <i className="icon-pencil"/>
                                            </button>
                                            <button className="btn btn-link pl-1 pt-0" title="Delete This Staff" type="button"
                                                    onClick={() => handleDeleteStaffClick(idx + 1)}>
                                                <i className="icon-minus"/>
                                            </button>
                                        </td>
                                    </tr>
                                )})
                            : <tr><td colSpan={6}><FormattedMessage id="app.contruction.No_Staff_Found" defaultMessage="No Staff Found" /></td></tr>
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
};

export default StaffMember;