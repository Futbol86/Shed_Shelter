import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector, change} from "redux-form";
import uuid from 'uuid';

import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {openModalAction} from "../../../../actions";
import {loadListSupplyDataEntry, uploadOrderAttachFiles, deleteAnOrderAttachFile} from '../../actions';
import {ORDER_DETAIL_FORM_NAME, PREDEFINED_SUPPLY_TYPE_IDS} from "../../constants";
import {getSupplyDataEntryList, getOrderAttachFiles} from "../../selectors";

import AttachFileInvitationComponent from "../../components/Order/AttachFileInvitation";

class AttachFileInvitation extends Component {
    componentDidMount(){
        const { quoteId } = this.props;
        if (quoteId) {
            this.props.loadListSupplyDataEntry({limit: 1000});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.attachFiles && (this.props.attachFiles !== prevProps.attachFiles)) {
            this.props.changeFieldValue("fileRelPaths", this.props.attachFiles);
        }
        if (this.props.removedFiles && (this.props.removedFiles !== prevProps.removedFiles)) {
            this.props.changeFieldValue("removedFiles", this.props.removedFiles);
        }

        if (this.props.orderDetails && this.props.orderDetails.attachItems
            && (!prevProps.orderDetails || !prevProps.orderDetails.attachItems)
        ) {
            let attachItems = this.props.orderDetails.attachItems.map(item => {
                return {
                    supplyDataEntryId: item.supplyDataEntryId + '',
                    fileRelPaths: item.fileRelPaths
                };
            });

            // console.log('attachItems', attachItems);
            
            this.props.changeFieldValue("attachItems", attachItems);
        }

        if (!this.props.attachItems) {
            this.props.changeFieldValue("attachItems", [{
                supplyDataEntryId: 0,
                fileRelPaths: []
            }]);
        }
    }

    initialSupplyDataEntries = () => {
        const {supplyDataEntries} = this.props;
        let allRollForms = [], allSuppliers = [];

        if (supplyDataEntries && supplyDataEntries.length) {
            allRollForms = supplyDataEntries ? supplyDataEntries.filter(entry => entry.supplyType + '' === PREDEFINED_SUPPLY_TYPE_IDS.ROLL_FORM + '') : [];
            allSuppliers = supplyDataEntries ? supplyDataEntries.filter(entry => entry.supplyType + '' === PREDEFINED_SUPPLY_TYPE_IDS.SUPPLIER + '') : [];
        }

        return {allRollForms, allSuppliers}
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadOrderAttachFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this file?',
            onConfirm: () => this.props.deleteAnOrderAttachFile({id}),
        });
    };


    render() {
        const {allRollForms, allSuppliers} = this.initialSupplyDataEntries();
        return (
            <AttachFileInvitationComponent {...this.props}
                staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL}
                allRollForms={allRollForms} allSuppliers={allSuppliers}
                handleFileDrops={this.handleFileDrops}
                handleDeleteFile={this.handleDeleteFile}
            />
        );
    }
}

const formSelector = formValueSelector(ORDER_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    supplyDataEntries:      getSupplyDataEntryList(state),
    rollForms:              formSelector(state, "rollForms"),
    suppliers:              formSelector(state, "suppliers"),
    attachItems:            formSelector(state, "attachItems"),
    attachFiles:            getOrderAttachFiles(state),
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(ORDER_DETAIL_FORM_NAME, field, value))
    },

    loadListSupplyDataEntry:    payload => dispatch(loadListSupplyDataEntry(payload)),
    uploadOrderAttachFiles:     payload => dispatch(uploadOrderAttachFiles(payload)),
    deleteAnOrderAttachFile:    payload => dispatch(deleteAnOrderAttachFile(payload)),
    openModalAction:            payload => dispatch(openModalAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttachFileInvitation); 