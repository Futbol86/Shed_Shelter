import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {Row, Col, Label} from 'reactstrap';
import {EXPORTED_PDF_TYPES} from "../../../constants";

class PDFExportModal extends Component{
    render(){
        const { hasSHSColumn, handleModalClose, handleSubmit, userAccessModules } = this.props;        
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        <FormattedMessage id="app.quotes.Pdf_Export" defaultMessage="Export" />
                    </h4>
                </div>

                <div className="modal-body">
                    <Row className="pt-2">
                        <Col md={12} xs={24}>
                            <Label className="col-form-label d-flex flex-row">
                                <FormattedMessage id="app.quotes.Select" defaultMessage="Select" />    
                            </Label>
                            <Field component="select" name="exportedPdf"
                                    className="form-control form-control-sm ml-1"
                            >
                                {EXPORTED_PDF_TYPES.map((item, idx) =>
                                    {
                                        const moduleValue = item.value;
                                        if ((!item.name.includes("SHS") || hasSHSColumn)
                                            && ((item.value === 'BOM' && userAccessModules && userAccessModules.some(mod => mod === 'all' || mod.includes(moduleValue)))
                                            || (userAccessModules && userAccessModules.some(mod => mod === 'all' || mod === moduleValue)))
                                        ) {
                                            return <option key={idx} value={item.value}>{item.name}</option>
                                        } else {
                                            return null;
                                        }
                                    }
                                )}
                            </Field>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        <FormattedMessage id="app.Close" defaultMessage="Close" />
                    </button>

                    <button type="submit" className="btn btn-primary" onClick = {handleSubmit}>
                        <FormattedMessage id="app.Submit" defaultMessage="Submit"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default PDFExportModal;
