import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";

import {QUOTES_ATTACHED_NOTE_AND_TEXT_MODAL_FORM_NAME, DOCS_TYPE_QUOTES_SHEET} from "../../../constants";
import {DOC_exportQuotesPDF, DOC_clearRemoteQuotesPDF} from "../../../actions";
import {getQuotesRemotePDF} from "../../../selectors";
import {DOC_changeActiveModal} from "../../../../documents/actions";
import {getDocCurrentModalId} from "../../../../documents/selectors";

import QuotePagePDFModalComponent from "../../../components/QuoteDetail/PDFModal/QuotePagePDFModal"

class QuotePagePDFModal extends Component {
    componentDidMount() {
        const { quotes, filter } = this.props;
        this.props.DOC_exportQuotesPDF({
            pageId: DOCS_TYPE_QUOTES_SHEET,
            pageData: {
                quotes,
                filter
            }
        });
    }

    componentWillUnmount() {
        this.props.DOC_clearRemoteQuotesPDF();
    };

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    render() {
        const {remotePDF} = this.props;

        return (
            <QuotePagePDFModalComponent pageTitleId="Quotes Page"
                                        remotePDF={remotePDF}
                                        handleModalClose={() => this.handleModalChange(0)}/>
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */

const mapStateToProps = (state) => ({
    currentModalId:         getDocCurrentModalId(state),
    remotePDF:              getQuotesRemotePDF(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_exportQuotesPDF:        payload => dispatch(DOC_exportQuotesPDF(payload)),
    DOC_clearRemoteQuotesPDF:   payload => dispatch(DOC_clearRemoteQuotesPDF(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUOTES_ATTACHED_NOTE_AND_TEXT_MODAL_FORM_NAME,
        onSubmit: onSubmitActions(QUOTES_ATTACHED_NOTE_AND_TEXT_MODAL_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(QuotePagePDFModal)
);