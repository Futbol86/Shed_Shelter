import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert } from 'reactstrap';

import ContructionDataEntryInfo from './ContructionDataEntry/ContructionDataEntryInfo';
import StaffMember from './ContructionDataEntry/StaffMember';

class ContructionDataEntryAdd extends Component {
    render(){
        const {userList, uploadRootURL, insurancePolicyType, insurancePolicyFileRelPaths, contructionDataEntryDetail, 
               staffs, handleModalChange, handleModalClose, currentModalId,
               handleEditStaffClick, handleDeleteStaffClick, handleSubmit, handleFileDrops, handleDeleteInsuranceFile,
               error, submitting, pristine, invalid, reset} = this.props;
        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {contructionDataEntryDetail && contructionDataEntryDetail.id ?
                                    <FormattedMessage id="app.contruction.Edit_Contruction_Data_Entry" defaultMessage="Edit Contruction Data Entry" />
                                    : <FormattedMessage id="app.contruction.Add_New_Contruction_Data_Entry" defaultMessage="Add New Contruction Data Entry" />
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <ContructionDataEntryInfo userList={userList} uploadRootURL={uploadRootURL} 
                                                              insurancePolicyType={insurancePolicyType}
                                                              insurancePolicyFileRelPaths={insurancePolicyFileRelPaths}
                                                              handleFileDrops={handleFileDrops}
                                                              handleDeleteInsuranceFile={handleDeleteInsuranceFile}/>
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
                            <Row className="pt-2">
                                <Col xs="12">
                                    {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            {contructionDataEntryDetail && contructionDataEntryDetail.id?
                                <Button outline color="secondary">
                                    <NavLink to={`/contructions/contruction-data-entries/list`} className="text-dark">
                                        <FormattedMessage id="app.contruction.Return_Contruction_Data_Entry_List" defaultMessage="Return Contruction Data Entry List" />
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
                                {contructionDataEntryDetail && contructionDataEntryDetail.id ?
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

ContructionDataEntryAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default ContructionDataEntryAdd;