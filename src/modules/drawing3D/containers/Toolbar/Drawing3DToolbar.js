import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change} from "redux-form";

import {DRAWING_3D_TOOLBAR_FORM_NAME} from "../../constants";
import {doAddBay, doRemoveBay, doChangeFurnitureTab} from "../../actions";
import {getBaySheds, getFurnitureTabIndex, getAFurnitureComponents} from "../../selectors";
import Drawing3DToolbarComponent from '../../components/Toolbar/Drawing3DToolbar';

class Drawing3DToolBar extends Component {
    componentDidMount() {
        this.props.initialize({
            "baySheds": this.props.baySheds,
            "colours.doorType": "roller_door",
            "colours.doorComponent": "main_door"
        })
    }

    componentDidUpdate(prevProps) {
        const {baySheds} = this.props;
        
        if(!prevProps.baySheds || (baySheds && prevProps.baySheds && baySheds !== prevProps.baySheds))
            this.props.changeFieldValue('baySheds', baySheds);
    }

    handleAddBay = () => {
        this.props.doAddBay({});
    }

    handleRemoveBay = () => {
        this.props.doRemoveBay({});
    }

    handleChangeTabs = (tabIndex) => {
        this.props.doChangeFurnitureTab({tabIndex})
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Drawing3DToolbarComponent {...this.props} handleAddBay={this.handleAddBay} 
                                                           handleRemoveBay={this.handleRemoveBay}
                                                           handleChangeTabs={this.handleChangeTabs}/>
            </div>
        );
    }
}

const formSelector = formValueSelector(DRAWING_3D_TOOLBAR_FORM_NAME);

const mapStateToProps = (state) => ({
    baySheds:                getBaySheds(state),
    furnitureTabIndex:       getFurnitureTabIndex(state),

    colourFormData:          formSelector(state, "colours"),
});

const mapDispatchToProps = (dispatch) => ({
    doAddBay:                   payload => dispatch(doAddBay(payload)),  
    doRemoveBay:                payload => dispatch(doRemoveBay(payload)),  
    doChangeFurnitureTab:       payload => dispatch(doChangeFurnitureTab(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DRAWING_3D_TOOLBAR_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DRAWING_3D_TOOLBAR_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(Drawing3DToolBar)
);
