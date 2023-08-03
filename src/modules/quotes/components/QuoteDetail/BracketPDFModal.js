import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Col, Row} from 'reactstrap';
import PropTypes from "prop-types";

class BracketPDFModal extends React.Component {

    render(){
        const { handleModalClose, handleDownloadClick, remotePDF, pageTitleId } = this.props;

        let blobPDF, pdfFileURL;
        if (remotePDF){
            blobPDF = new Blob([remotePDF], {type: 'application/pdf'});

            //Build a URL from the file
            pdfFileURL = window.URL.createObjectURL(blobPDF);
        }

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        <FormattedMessage id={pageTitleId} defaultMessage="PDF Viewer" />
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col>

                            {remotePDF &&
                            <div className="embed-responsive" style={{minHeight: '400px'}}>
                                <iframe className="embed-responsive-item" style={{marginTop: '-50px'}}
                                        src={`${pdfFileURL}`}  name="frmPDF" id="frmPDF"
                                />
                            </div>
                            }
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        <FormattedMessage id="app.Close" defaultMessage="Close" />
                    </button>

                    {remotePDF ?
                        <button className="btn btn-primary" onClick={() => window.frames["frmPDF"] && window.frames["frmPDF"].print()}>
                            <FormattedMessage id="app.Print" defaultMessage="Print" />
                        </button>
                        : null
                    }

                    {remotePDF ?
                        <button className="btn btn-primary" onClick={handleDownloadClick}>
                            <FormattedMessage id="app.Download" defaultMessage="Download" />
                        </button>
                        : null
                    }
                </div>
            </div>
        );
    }
}

BracketPDFModal.propTypes = {
    pageTitleId: PropTypes.string.isRequired
};

export default injectIntl(BracketPDFModal);