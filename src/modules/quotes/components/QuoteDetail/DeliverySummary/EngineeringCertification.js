import React from 'react';
import {CardBody, Card, CardHeader, Row, Col, Label} from 'reactstrap';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Field} from "redux-form";
import {FieldDropZone} from "../../../../../components/common/Form";
import {PREDEFINED_ENGINEERING_CLASSES} from "../../../../../constants";

const EngineeringCertification  = ({ecCertRequired, ecSoilCertRequired, handleFileDrops, certFiles, staticFileUrl, intl}) => {
    const selectCertMsg = intl.formatMessage({
        id: 'app.quotes.Select_certificates',
        defaultMessage: 'Select certificate(s) ...'
    });
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.quotes.Engineering_Certification" defaultMessage="Engineering Certification" /></strong>
            </CardHeader>
            <CardBody className="pb-2 pt-2">
                <Row className="mb-1">
                    <Col xs="8" md="5" className="pl-1">
                        <FormattedMessage id="app.quotes.Certificate_required" defaultMessage="Certificate required?" />
                    </Col>
                    <Col xs="4" md="1" className="pl-1">
                        <Field name="ecCertRequired" id="ecCertRequired" component="input" type="checkbox" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1">
                        <div className="d-flex flex-column">
                            <Field
                                name="certList"
                                component={FieldDropZone}
                                disabled={!(ecCertRequired)}
                                handleFileDrops={handleFileDrops}
                                label={selectCertMsg}
                                className="btn btn-outline-primary btn-sm btn-block"
                                // listDroppedFiles={true}
                            />
                            {certFiles && Array.isArray(certFiles) && (
                                <ul>
                                    { certFiles.map((fileName, i) =>
                                        <li key={i}><a href={`${staticFileUrl}/${fileName}`} target="_blank">{fileName}</a></li>)
                                    }
                                </ul>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col xs="8" md="5" className="pl-1">
                        <FormattedMessage id="app.quotes.Soil_certificate_required" defaultMessage="Soil certificate required?" />
                    </Col>
                    <Col xs="4" md="1" className="pl-1">
                        <Field name="ecSoilCertRequired" id="ecSoilCertRequired" component="input" type="checkbox" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1 d-flex justify-content-end">

                        <Label className="d-flex flex-row">
                            <FormattedMessage id="app.quotes.Class" defaultMessage="Class" />

                            <Field component="select" name="engineerClass" id="engineerClass"
                                   className="form-control form-control-sm" disabled = {true}>
                                {PREDEFINED_ENGINEERING_CLASSES.map((item, idx) =>
                                    <option key={idx} value={item.id}>{item.name}</option>
                                )}
                            </Field>
                        </Label>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default injectIntl(EngineeringCertification);