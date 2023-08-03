import React, {Component} from 'react';
import {connect} from 'react-redux';
import {change, formValueSelector, reduxForm} from "redux-form";
import AddEditStaffModalComponent from "../../components/ContructionDataEntry/AddEditStaffModal";
import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import {
    CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME,
    CONTRUCTION_DATA_ENTRY_ADD_STAFF_FORM_NAME
} from "../../constants";
import {getOrSdeActiveStaff} from "../../selectors";
import {getDocCurrentModalType} from "../../../documents/selectors";

class AddEditStaffModal extends Component {
    componentDidMount() {
        const {activeStaff} = this.props;
        if (activeStaff) {
            const initialStaffForm = {
                name: activeStaff.name,
                position: activeStaff.position,
                contact: activeStaff.contact,
                nextOfKin: activeStaff.nextOfKin,
                relationship: activeStaff.relationship,
            }
            
            this.props.initialize(initialStaffForm);
        }
    }

    /**
     * Handle Staff submit: We will need to do it by ourselves, cannot use the default submission since it cause
     * the parent form (supplyDataEntry) to be submitted too.
     *
     * @param event
     */
    handleAddUpdateClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {activeStaff, name, position, contact, nextOfKin, relationship} = this.props;
        let staffs = this.props.staffs && this.props.staffs.length ? this.props.staffs : [];
        let updatedStaffs = [...staffs];
        if (activeStaff && activeStaff.id >= 0 && activeStaff.id < staffs.length) {
            updatedStaffs[activeStaff.id] = {name, position, contact, nextOfKin, relationship};
        } else {
            updatedStaffs.push({name, position, contact, nextOfKin, relationship});
        }

        this.props.changeFieldValue("staffs", updatedStaffs);
        this.props.handleModalClose();
    };
    
    render() {
        return (
            <AddEditStaffModalComponent {...this.props}
                handleModalClose={this.props.handleModalClose}
                handleAddUpdateClick={this.handleAddUpdateClick}
            />
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */
const validate = (values) => {
    const errors = {};

    errors.name = validateRequired(values.name);
    errors.position = validateRequired(values.position);
    errors.contact = validateRequired(values.contact);
    errors.nextOfKin = validateRequired(values.nextOfKin);
    errors.relationship = validateRequired(values.relationship);

    return errors;
};

const formSelector = formValueSelector(CONTRUCTION_DATA_ENTRY_ADD_STAFF_FORM_NAME);
const mapStateToProps = (state) => ({
    name:           formSelector(state, "name"),
    position:       formSelector(state, "position"),
    contact:        formSelector(state, "contact"),
    nextOfKin:      formSelector(state, "nextOfKin"),
    relationship:   formSelector(state, "relationship"),
    activeStaff:    getOrSdeActiveStaff(state),
    currentModalType: getDocCurrentModalType(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME, field, value))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: CONTRUCTION_DATA_ENTRY_ADD_STAFF_FORM_NAME,
        enableReinitialize:true,
        keepDirtyOnReinitialize: true,
        validate
    })(AddEditStaffModal)
);