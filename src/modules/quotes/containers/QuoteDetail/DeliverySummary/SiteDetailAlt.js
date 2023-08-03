import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import SiteDetailAltComponent from "../../../components/QuoteDetail/DeliverySummary/SiteDetailAlt";
import {getQDAltSiteAddressGeoLocation} from "../../../selectors";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {loadAltGeocodeLatLngAction} from '../../../actions';

class SiteDetailAlt extends Component {
    componentDidMount() {
        const { altGeoLocation, altSiteAddress } = this.props;
        if (altGeoLocation && (!altGeoLocation.lat || !altGeoLocation.lng)) {
            if (altSiteAddress && altSiteAddress.addressState && altSiteAddress.addressPostcode)
                this.handleMapDrawingAlt();
        }
    }

    handleMapDrawingAlt = () => {
        this.props.loadAltGeocodeLatLngAction(this.props.altSiteAddress);
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
        const { deliveryIsAltAddress, altGeoLocation, altSiteAddress, siteAddress, changeFieldValue, handleMapDrawingAlt} = this.props;

        // if (deliveryIsAltAddress && deliveryIsAltAddress !== prevProps.deliveryIsAltAddress && !altSiteAddress && siteAddress) {
        //     changeFieldValue('altSiteAddress', siteAddress);
        // }

        if (altGeoLocation) {
            if ((!prevProps.altGeoLocation && altGeoLocation.lat) || (altGeoLocation.lat !== prevProps.altGeoLocation.lat)) {
                changeFieldValue('altSiteAddress.lat', altGeoLocation.lat);
            }
            if ((!prevProps.altGeoLocation && altGeoLocation.lng) || (altGeoLocation.lng !== prevProps.altGeoLocation.lng)) {
                changeFieldValue('altSiteAddress.lng', altGeoLocation.lng);
            }
        }

        //-- Handle redraw map after site address is loaded
        if (!prevProps.altSiteAddress && altSiteAddress && altSiteAddress.addressState) {
            handleMapDrawingAlt();
        }
    }

    render() {
        return (
            <SiteDetailAltComponent {...this.props} handleMapDrawingAlt={this.handleMapDrawingAlt} 
                onLockMapClick={this.onLockMapClick} onRotateShedClick={this.onRotateShedClick}/>
        );
    }
}

SiteDetailAlt.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    altGeoLocation:         getQDAltSiteAddressGeoLocation(state),
    altSiteAddress:         formSelector(state, "altSiteAddress"),
    siteAddress:            formSelector(state, "siteAddress"),
    deliveryIsAltAddress:   formSelector(state, "deliveryIsAltAddress"),
    mapLocked:              formSelector(state, "mapLocked"),
    mapShedLocation:    formSelector(state, "mapShedLocation"), // lat, lng, bearing 
});

export default connect(mapStateToProps, {loadAltGeocodeLatLngAction})(SiteDetailAlt);