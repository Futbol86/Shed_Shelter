import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from "redux-form";
import uuid from 'uuid';

import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {openModalAction} from "../../../../actions";
import {loadListContructionDataEntry, uploadContructionAttachFiles, deleteAnContructionAttachFile} from '../../actions';
import {getContructionDataEntryList, getContructionAttachFiles} from "../../selectors";

import AttachFileInvitationComponent from "../../components/Contruction/AttachFileInvitation";

class AttachFileInvitation extends Component {
    componentDidMount(){
        const { quoteId } = this.props;
        if (quoteId) {
            this.props.loadListContructionDataEntry({limit: 1000});
        }
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadContructionAttachFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this file?',
            onConfirm: () => this.props.deleteAnContructionAttachFile({id}),
        });
    };


    render() {
        return (
            <AttachFileInvitationComponent {...this.props}
                staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
                handleFileDrops={this.handleFileDrops}
                handleDeleteFile={this.handleDeleteFile}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    contructionDataEntries:      getContructionDataEntryList(state),
    attachFiles:                 getContructionAttachFiles(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListContructionDataEntry:     payload => dispatch(loadListContructionDataEntry(payload)),
    uploadContructionAttachFiles:     payload => dispatch(uploadContructionAttachFiles(payload)),
    deleteAnContructionAttachFile:    payload => dispatch(deleteAnContructionAttachFile(payload)),
    openModalAction:                  payload => dispatch(openModalAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttachFileInvitation);