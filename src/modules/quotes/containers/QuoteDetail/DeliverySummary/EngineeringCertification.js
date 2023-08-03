import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EngineeringCertificationComponent from "../../../components/QuoteDetail/DeliverySummary/EngineeringCertification";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {QD_DS_uploadCertFile, QD_DS_uploadCertFilesStart} from "../../../actions";
import {getQDDSCertFiles} from "../../../selectors";

class EngineeringCertification extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.certFiles && (this.props.certFiles !== prevProps.certFiles)) {
            this.props.changeFieldValue("ecCertList", this.props.certFiles);
        }
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        this.props.QD_DS_uploadCertFilesStart();
        acceptedFiles.forEach(file => {
            this.props.QD_DS_uploadCertFile(file);
        });
    };

    render() {
        return (
            <EngineeringCertificationComponent {...this.props} staticFileUrl = {process.env.REACT_APP_STATIC_FILE_URL}
                                               handleFileDrops={this.handleFileDrops}
            />
        );
    }
}

EngineeringCertification.propTypes = {
    changeFieldValue: PropTypes.func
};

const bdFormSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    ecCertRequired:     bdFormSelector(state, `ecCertRequired`),
    ecSoilCertRequired: bdFormSelector(state, `ecSoilCertRequired`),
    certFiles:          getQDDSCertFiles(state)
});

export default connect(mapStateToProps, {QD_DS_uploadCertFile, QD_DS_uploadCertFilesStart})(EngineeringCertification);