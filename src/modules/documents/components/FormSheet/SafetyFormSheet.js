import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from 'reactstrap';

import BasicInfoSafetyFormComponent from "./SafetyForms/BasicInfoSafetyForm";
import HazzardPresentSafetyFormComponent from "./SafetyForms/HazzardPresentSafetyForm";
import PotentialHazzardSafetyFormComponent from "./SafetyForms/PotentialHazzardSafetyForm";
import PrintNameSafetyFormComponent from "./SafetyForms/PrintNameSafetyForm";

class SafetyFormSheet extends Component {
    render(){
        const { 
            safetyFormDetail, quoteDetail, submitting, pristine, invalid, 
            handlePrintNameRemove, handlePotentialHazzardRemove, handleExportPDFFile, handleSubmit 
        } = this.props;
        let logoFilePath = process.env.REACT_APP_STATIC_FILE_URL2 + "images/logos/"+ (quoteDetail && quoteDetail.userDetail && quoteDetail.userDetail.logoFilePath);

        return (
            <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                <Card>
                    <CardHeader>
                        <h2>
                            <FormattedMessage id="app.docs.Safety_Forms" defaultMessage="Safety Forms"/>
                        </h2>
                    </CardHeader>
                    <CardBody>
                        {
                            quoteDetail && quoteDetail.userDetail && quoteDetail.userDetail.logoFilePath &&
                            <Row className="mb-2">
                                <Col md={12}>
                                    <img src={logoFilePath}/>
                                </Col>
                            </Row>
                        }
                        <Row className="mb-2">
                            <Col md="4"> 
                                <BasicInfoSafetyFormComponent quoteDetail={quoteDetail}/>
                            </Col>
                            <Col md="4"> 
                                <HazzardPresentSafetyFormComponent/>
                            </Col>
                            <Col md="4"> 
                                <PrintNameSafetyFormComponent handlePrintNameRemove={handlePrintNameRemove}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="12"> 
                                <PotentialHazzardSafetyFormComponent handlePotentialHazzardRemove={handlePotentialHazzardRemove}/>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <div className='d-flex justify-content-between'>
                            <NavLink to={`/quotes/list`} className="btn-secondary p-2 text-dark">
                                <FormattedMessage id="app.docs.Return_Quote_List" defaultMessage="Return Quote List" />
                            </NavLink>

                            <Button color="secondary" onClick={handleExportPDFFile}>
                                <i className="fa fa-file-excel-o" /> <FormattedMessage id="app.docs.Export_PDF" defaultMessage="Export PDF"/>
                            </Button>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    safetyFormDetail && safetyFormDetail.id ? <FormattedMessage id="app.Update" defaultMessage="Update" />
                                                                            : <FormattedMessage id="app.Save" defaultMessage="Save" />
                                }
                            </LaddaButton>
                        </div>
                    </CardFooter>
                </Card>
            </Form>
        );
    }
}

export default SafetyFormSheet;