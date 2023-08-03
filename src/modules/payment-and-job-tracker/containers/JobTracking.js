import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change} from 'redux-form';
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {
    JT_loadACheckList,
    JT_updateATrackingItem,
    JT_loadAShedInformation,
    JT_updateAShedInformation
} from "../actions";
import {
    getJTCheckList,
    getJTQuoteDetails,
    getJTClient,
    getJTTrackingJobId,
    getShedInformationDetail
} from "../selectors";
// import {getDocCurrentModalId} from "../../documents/selectors";
// import {DOC_changeActiveModal} from "../../documents/actions";

import {openModalAction} from "../../../actions";

import {JOB_CHECK_LIST_ITEMS, JT_JOB_TRACKING_FORM_NAME} from '../constants';
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import JobTrackingComponent from "../components/JobTracking";
import NotFound from "../../../components/common/NotFound";

class JobTracking extends Component {
    componentDidMount() {
        const {history} = this.props;
        let {quoteId} = this.props.match.params;
        if (!quoteId) {
            history.push('/quotes/list?status=S');
        } else {
            const query = new URLSearchParams(history.location.search);
            let communicationKey = query.get('communicationKey');
            this.props.JT_loadACheckList({quoteId, communicationKey});
            this.props.JT_loadAShedInformation({quoteId});
        }   
    };

    componentDidUpdate(prevProps) {
        const {shedInformationDetail} = this.props;
        if(shedInformationDetail && !prevProps.shedInformationDetail || 
          (shedInformationDetail && prevProps.shedInformationDetail && shedInformationDetail.quoteId !== prevProps.shedInformationDetail.quoteId)) {
            this.props.changeFieldValue("deliveryDate", shedInformationDetail && shedInformationDetail.deliveryDate)
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleOptionClick = (event) => {
        const value = event.target.value;
        let {quoteId} = this.props.match.params;
        const {checkList} = this.props;
        if (quoteId && value && value.includes(".")) {
            let key = value.split('.')[0];
            let subKey = value.split('.')[1];
            let updatedValue = true;
            if (checkList && checkList[key] && checkList[key][subKey])  {
                updatedValue = !checkList[key][subKey];
            }

            this.props.JT_updateATrackingItem({
                id: this.props.trackingJobId,
                quoteId,
                data: {
                    [key]: {
                        [subKey]: updatedValue
                    }
                }
            });
        }
    };

    handleLockUnlockClick = (itemValue, isLocked) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: `Are you sure to ${isLocked ? 'unlock' : 'lock'} this log?`,
            onConfirm: () => {
                let {quoteId} = this.props.match.params;
                if (quoteId) {
                    this.props.JT_updateATrackingItem({
                        id: this.props.trackingJobId,
                        quoteId,
                        data: {
                            [itemValue]: {
                                isLocked: !isLocked
                            }
                        }
                    });
                }
            },
        });  
    };

    initialCheckList = () => {
        let savedCheckList = this.props.checkList;
        let checkListItems = [];
        if (JOB_CHECK_LIST_ITEMS && JOB_CHECK_LIST_ITEMS.length) {
            JOB_CHECK_LIST_ITEMS.forEach(item => {
                if (item.subListItems && item.subListItems.length) {
                    item.subListItems.forEach(subItem => {
                        checkListItems.push({
                            item: subItem,
                            itemId: item.id
                        });
                    });
                } else {
                    checkListItems.push({
                        item: item,
                        itemId: item.id
                    });
                }
            });
        }

        return checkListItems.map(item => {
            if (item.item && savedCheckList) {
                let savedItem = savedCheckList[item.item.value];
                if (savedItem) {
                    return ({
                        ...item,
                        ...savedItem
                    });
                } else {
                    return item;
                }
            }
                
            return item;
        })
    };

    initialNumberList = () => {
        if (JOB_CHECK_LIST_ITEMS && JOB_CHECK_LIST_ITEMS.length) {
            let savedCheckList = this.props.checkList;
            return JOB_CHECK_LIST_ITEMS.map(item => {
                let isSelected = true;
                if (item.subListItems && item.subListItems.length && savedCheckList) {
                    for (let i = 0; i < item.subListItems.length; i++) {
                        let value = item.subListItems[i].value;
                        let savedItem = savedCheckList[value];
                        if (!savedItem || (!savedItem.isChecked && !savedItem.isNA)) {
                            isSelected = false;
                            break;
                        }
                    }
                } else if (savedCheckList) {
                    let value = item.value;
                    let savedItem = savedCheckList[value];
                    isSelected = savedItem && (savedItem.isChecked || savedItem.isNA);
                }

                return {
                    ...item,
                    isSelected
                }
            });
        }
    };

    handleDeliveryDateSave = (evt) => {
        let {quoteId} = this.props.match.params;
        const {deliveryDate} = this.props;
        this.props.JT_updateAShedInformation({quoteId, deliveryDate});
    }

    render() {
        // if (this.props.trackingJobId === -1) {
        //     return <NotFound />
        // }
        
        let checkList = this.initialCheckList();
        let numberList = this.initialNumberList();

        return (
            <JobTrackingComponent {...this.props}
                checkList={checkList} numberList={numberList}
                handleOptionClick={this.handleOptionClick}
                handleLockUnlockClick={this.handleLockUnlockClick}
                handleDeliveryDateSave={this.handleDeliveryDateSave}
                handleModalChange={this.handleModalChange}
            />
        );
    }
}

const formSelector = formValueSelector(JT_JOB_TRACKING_FORM_NAME);
const mapStateToProps = (state) => ({
    checkList:          getJTCheckList(state),
    quoteDetails:       getJTQuoteDetails(state),
    clientDetail :      getJTClient(state),
    trackingJobId:      getJTTrackingJobId(state),
    // currentModalId:     getDocCurrentModalId(state),
    shedInformationDetail: getShedInformationDetail(state),
    deliveryDate:       formSelector(state, 'deliveryDate'),
});

const mapDispatchToProps = (dispatch) => ({
    JT_loadACheckList:          payload => dispatch(JT_loadACheckList(payload)),
    JT_updateATrackingItem:     payload => dispatch(JT_updateATrackingItem(payload)),
    JT_loadAShedInformation:    payload => dispatch(JT_loadAShedInformation(payload)),
    JT_updateAShedInformation:  payload => dispatch(JT_updateAShedInformation(payload)),
    // DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    // openModalAction:            payload => dispatch(openModalAction(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(JT_JOB_TRACKING_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: JT_JOB_TRACKING_FORM_NAME,
        onSubmit: onSubmitActions(JT_JOB_TRACKING_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(JobTracking)
);