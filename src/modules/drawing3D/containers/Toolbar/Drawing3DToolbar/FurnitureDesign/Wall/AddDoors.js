import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from "redux-form";
import {SIMULATE_3D_SCALE, WALL_ADD_DOORS_FORM_NAME, FURNITURE_DOOR_TYPES} from "../../../../../constants";
import { getSelectedFurnitureWall } from "../../../../../selectors";
import AddDoorsComponent from "../../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/Wall/AddDoors";

class AddDoors extends Component {
    componentDidMount() {
        const { selectedWall } = this.props;
        if(selectedWall) {
            this.renderAddDoorFieldArray(selectedWall);
        }
    }

    componentDidUpdate(prevProps) {
        const { selectedWall } = this.props;
        if(selectedWall && prevProps && selectedWall.name !== prevProps.selectedWall.name) {
            this.renderAddDoorFieldArray(selectedWall);
        }
    }

    renderAddDoorFieldArray = (wall) => {
        const {wallParams: {doorList}} = wall;
        let addDoorArrays = [];
        doorList && doorList.map(item => {
            addDoorArrays.push({
                doorLeft: item.doorLeft/SIMULATE_3D_SCALE,
                doorType: item.doorType
            })
        });

        this.props.changeFieldValue("addDoors", addDoorArrays);
    }

    render() {
        return (
            <AddDoorsComponent {...this.props} />
        )
    }
}

const handleSubmit = (value, dispatch, props) => {
    props.addWallDoor();
}

const validate = (values, props) => {
    const errors = {};

    if(!values.addDoors || !values.addDoors.length) {
        errors.addDoors = { _error: '*** At least one door must be entered ***'};
    } else {
        let addDoorArrayErrors = [];
        values.addDoors.forEach((addDoor, addDoorIndex) => {
            let addDoorErrors = {};
            if(!addDoor || !addDoor.doorLeft || addDoor.doorLeft < 0) {
                addDoorErrors.doorLeft = "Required";
                addDoorArrayErrors[addDoorIndex] = addDoorErrors;
            } else if(!addDoor || !addDoor.doorType) {
                addDoorErrors.doorType = "Required";
                addDoorArrayErrors[addDoorIndex] = addDoorErrors;
            } else {
                const {selectedWall} = props;
                let wallLength = selectedWall.wallParams?.wallLength;
                let doorWidth = FURNITURE_DOOR_TYPES[addDoor.doorType].value.width

                if((addDoor.doorLeft * SIMULATE_3D_SCALE) + doorWidth >= wallLength) {
                    errors.addDoors = { _error: "*** Door left over wall length ***" };
                }
            }
        });

        if(addDoorArrayErrors.length) {
            errors.addDoors = addDoorArrayErrors;
        }
    }

    //console.log('---- validate', errors)
    return errors;
}

const mapStateToProps = (state) => ({
    selectedWall:                   getSelectedFurnitureWall(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(WALL_ADD_DOORS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: WALL_ADD_DOORS_FORM_NAME,
        onSubmit: handleSubmit,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(AddDoors)
);
