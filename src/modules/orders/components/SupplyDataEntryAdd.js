import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';

import SupplyDataEntryInfo from './SupplyDataEntry/SupplyDataEntryInfo';
import StaffMember from './SupplyDataEntry/StaffMember';

class SupplyDataEntryAdd extends Component {
    render(){
        const {userList, supplyDataEntryDetail, staffs, handleModalChange, handleModalClose, currentModalId,
            handleEditStaffClick, handleDeleteStaffClick, handleSubmit,
            submitting, pristine, invalid, reset} = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {supplyDataEntryDetail && supplyDataEntryDetail.id ?
                                    <FormattedMessage id="app.order.Edit_Supply_Data_Entry" defaultMessage="Edit Supply Data Entry" />
                                    : <FormattedMessage id="app.order.Add_New_Supply_Data_Entry" defaultMessage="Add New Supply Data Entry" />
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <SupplyDataEntryInfo userList={userList}/>
                                </Col>
                            </Row>
                            <Row className="pt-2">
                                <Col xs="12">
                                    <StaffMember staffs={staffs} 
                                                currentModalId={currentModalId}
                                                handleModalChange={handleModalChange}
                                                handleModalClose={handleModalClose}
                                                handleEditStaffClick={handleEditStaffClick}
                                                handleDeleteStaffClick={handleDeleteStaffClick}/>
                                </Col>
                            </Row>
                        </CardBody>

                        <CardFooter className="d-flex justify-content-between">
                            {supplyDataEntryDetail && supplyDataEntryDetail.id?
                                <Button outline color="secondary">
                                    <NavLink to={`/orders/supply-data-entries/list`} className="text-dark">
                                        <FormattedMessage id="app.order.Return_Supply_Data_Entry_List" defaultMessage="Return Supply Data Entry List" />
                                    </NavLink>
                                </Button>
                                :
                                <Button color="secondary" disabled={pristine || submitting} onClick={reset}>
                                    <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                                </Button>
                            }

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting} disabled={submitting || invalid || pristine}>
                                {supplyDataEntryDetail && supplyDataEntryDetail.id ?
                                    <FormattedMessage id="app.Update" defaultMessage="Update" />
                                    : <FormattedMessage id="app.Save" defaultMessage="Save" />
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

SupplyDataEntryAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default SupplyDataEntryAdd;