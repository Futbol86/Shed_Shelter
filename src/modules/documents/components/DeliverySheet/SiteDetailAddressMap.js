import React, {PureComponent} from 'react';
import GoogleMapReact from 'google-map-react';
import {formValueSelector, Field} from "redux-form";
import { Row, Col } from 'reactstrap';
import {FormattedMessage} from "react-intl";
//import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {connect} from 'react-redux';
import {FieldInputPure} from "../../../../components/common/Form";
import QueenslandMap from './QueenslandMap';
import CoordinateUtils from '../../../quotes/components/QuoteDetail/DeliverySummary/CoordinateUtils';



class SiteDetailAddressMap extends PureComponent {
    getMapOptions = (maps) => {
        const {mapLocked} = this.props;
        return {
            //disableDoubleClickZoom: mapLocked ? mapLocked : false,
            draggable: !(mapLocked ? mapLocked : false),
            mapTypeId: maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {
                mapTypeIds: [
                    maps.MapTypeId.ROADMAP,
                    maps.MapTypeId.SATELLITE,
                    maps.MapTypeId.HYBRID
                ]
            }
        };
    }

    onChange = ({ center, zoom, bounds, size }) => {
        this.updateZoom(zoom);
    }

    updateZoom = (zoom) => {
        // const {changeFieldValue} = this.props;
        // changeFieldValue('mapZoomLevel', zoom);
    }

    mapApiIsLoaded = (map, maps, shape) => {
        console.log("mapApiIsLoaded") ;
        const {buildingDetail, siteAddress} = this.props;
        if(buildingDetail){
            const {mapShedLocation, buildingLength, buildingSpan} = buildingDetail;
            const google = window.google;
            var shedLocation = mapShedLocation && mapShedLocation.lat && mapShedLocation.lng? mapShedLocation : siteAddress;
            
            
            var circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0, 
                map,
                center: {lat: shedLocation.lat,
                        lng: shedLocation.lng},
                radius: 500,
                draggable: false,
                geodesic: false,
            });
            
            var shed = new google.maps.Polygon({
                    paths: shape,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35, 
                    draggable: true,
                    geodesic: false,
                    map,
                    zIndex: 99999
                });

            google.maps.event.addListener(shed, 'dragend', this.dragShedEnd);
        }
    };

    dragShedEnd = (evt) => {
        //console.log("Marker dropped: Current Lat: ", evt.latLng.lat() + ' Current Lng: ' + evt.latLng.lng());
        //this.updateShedPosition(evt.latLng.lat(), evt.latLng.lng());
    }

    updateShedPosition = (lat, lng) => {
        // const {changeFieldValue} = this.props;
        // changeFieldValue('mapShedLocation.lat', lat);
        // changeFieldValue('mapShedLocation.lng', lng);
    }

    render() {
        const {buildingDetail, siteAddress} = this.props;
        console.log("sitemap", buildingDetail) ;
        if(buildingDetail){
            const {mapZoomLevel, mapLocked, mapShedLocation, buildingSpan, buildingLength} = buildingDetail;
            if (siteAddress && (siteAddress.lat || siteAddress.lng)) {

                console.log("siteAddress", siteAddress) ;
                var shedLocation = mapShedLocation && mapShedLocation.lat && mapShedLocation.lng? mapShedLocation : siteAddress;
                var keyChanged = Math.ceil((mapLocked ? 1 : 0) + (mapShedLocation && mapShedLocation.bearing ?  
                                parseInt(mapShedLocation.bearing) + mapShedLocation.lat + mapShedLocation.lng: 
                                shedLocation.lat + shedLocation.lng));
                var zoomLevel = mapZoomLevel && mapZoomLevel > 0 ? mapZoomLevel : 15;
                
                const angle = shedLocation.bearing ? parseInt(shedLocation.bearing) : 0;
                const shape = CoordinateUtils.shedShape(shedLocation.lat, shedLocation.lng, angle,
                                buildingSpan/1000, buildingLength/1000);
                
                // if(siteAddress.addressState === 'QLD'){
                //     return (<QueenslandMap key={keyChanged} zoomLevel={zoomLevel} centerCoordinate={shedLocation} 
                //                 updateZoom={this.updateZoom} updateShedPosition={this.updateShedPosition}/>);
                // }
            
                return (
                    <React.Fragment>
                         <Row>
                             <Col>
                                <FormattedMessage id="app.docs.NSNS_web" defaultMessage="               www.nationalshedsandshelters.com.au               " />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormattedMessage id="app.docs.Get_To_Site" defaultMessage="How To Get T The Site " />
                            </Col>
                        </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Row className="pb-1 pl-1 pt-5">
                                <div style={{ height: '200px', width: '50%' }}>
                                        <GoogleMapReact key={keyChanged}
                                            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API, libraries:'geometry'}}
                                            center={{
                                                lat: shedLocation.lat,
                                                lng: shedLocation.lng
                                            }}
                                            defaultZoom={15}
                                            zoom={zoomLevel}
                                            options={this.getMapOptions}
                                            onChange={this.onChange}
                                            yesIWantToUseGoogleMapApiInternals={true}
                                            onGoogleApiLoaded={({ map, maps }) => this.mapApiIsLoaded(map, maps, shape)}
                                        />
                                    </div>
                                    <Field name="specialNote" id="specialNote" type="textarea" component={FieldInputPure} className="form-control"/>
                                </Row>
                            </Col>
                        </Row>
                    </React.Fragment>
                );
            }
        }
        return null;
    }
};
// const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
// const mapStateToProps = (state) => ({
//     mapZoomLevel:        formSelector(state, "mapZoomLevel"),
//     mapLocked:           formSelector(state, "mapLocked"),
//     mapShedLocation:     formSelector(state, "mapShedLocation"), // lat, lng, bearing 
//     buildingSpan:        formSelector(state, "buildingSpan"),
//     buildingLength:      formSelector(state, "buildingLength"),
// });

export default SiteDetailAddressMap;
