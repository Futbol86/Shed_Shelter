import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import SiteDetailComponent from "../../../components/QuoteDetail/DeliverySummary/SiteDetail";
import {getQDSiteAddressGeoLocation} from "../../../selectors";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {loadGeocodeLatLngAction} from '../../../actions';

class SiteDetail extends Component {
    componentDidMount() {
        const { geoLocation, siteAddress} = this.props;
        if (geoLocation && (!geoLocation.lat || !geoLocation.lng)) {
            if (siteAddress && siteAddress.addressState && siteAddress.addressPostcode)
                this.handleMapDrawing();
        }
    }

    handleMapDrawing = () => {
        this.props.loadGeocodeLatLngAction(this.props.siteAddress);
    };

    onLockMapClick = () => {
        const { mapLocked, changeFieldValue } = this.props;
        changeFieldValue('mapLocked', mapLocked ? false : true);     
    };

    onRotateShedClick = () => {
        const {changeFieldValue, mapShedLocation} = this.props;
        
        var heading = mapShedLocation && mapShedLocation.bearing ?  mapShedLocation.bearing : 0;
        heading = heading + 10 >= 360 ? (heading + 10 - 360) : heading + 10;
        //console.log('onRotateShedClick', heading);
        changeFieldValue('mapShedLocation.bearing', heading);     
        this.handleMapDrawing();
    };

    /**
     * Handle Updating Site Address lat + lon
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps) {
        const { geoLocation, siteAddress, changeFieldValue, handleMapDrawing} = this.props;
        // console.log("geoLocation: ", geoLocation, ' | Prev: ', prevProps.geoLocation);
        if (geoLocation) {
            if ((!prevProps.geoLocation && geoLocation.lat) || (geoLocation.lat !== prevProps.geoLocation.lat)) {
                changeFieldValue('siteAddress.lat', geoLocation.lat);
            }
            if ((!prevProps.geoLocation && geoLocation.lng) || (geoLocation.lng !== prevProps.geoLocation.lng)) {
                changeFieldValue('siteAddress.lng', geoLocation.lng);
            }
        }

        //-- Handle redraw map after site address is loaded
        if (!prevProps.siteAddress && siteAddress && siteAddress.addressState) {
            handleMapDrawing();
        }
    }

    render() {
        return (
            <SiteDetailComponent {...this.props} handleMapDrawing={this.handleMapDrawing} 
                onLockMapClick={this.onLockMapClick} 
                onRotateShedClick={this.onRotateShedClick}
                />
        );
    }
}

SiteDetail.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    geoLocation:        getQDSiteAddressGeoLocation(state),
    siteAddress:        formSelector(state, "siteAddress"),
    mapLocked:          formSelector(state, "mapLocked"),
    mapShedLocation:    formSelector(state, "mapShedLocation"), // lat, lng, bearing 
});

export default connect(mapStateToProps, {loadGeocodeLatLngAction})(SiteDetail);