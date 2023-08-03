import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Col, Row} from 'reactstrap';
import PropTypes from "prop-types";

class CommonPDFModal extends React.Component {

    render(){
        const { handleModalClose, remotePDF, pageTitleId, pdfName, intl } = this.props;

        const pageTitle = pageTitleId ? intl.formatMessage({id: pageTitleId}) : 'QuotePage';
        const fileName = pdfName ? pdfName : pageTitle;

        let blobPDF, pdfFileURL;
        if (remotePDF){
            blobPDF = new Blob([remotePDF], {type: 'application/pdf'});
            //Build a URL from the file
            pdfFileURL = window.URL.createObjectURL(blobPDF);
            // console.log('FileURL: ', pdfFileURL);
            //Open the URL on new Window
            // window.open(pdfFileURL);
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

                    {pdfFileURL ?
                            <a className="btn btn-primary" download={`${fileName || 'quote-page'}.pdf`} href={pdfFileURL}>
                                <FormattedMessage id="app.Download" defaultMessage="Download" />
                            </a>
                        : null
                    }
                </div>
            </div>
        );
    }
}

CommonPDFModal.propTypes = {
    pageTitleId: PropTypes.string.isRequired
};

export default injectIntl(CommonPDFModal);