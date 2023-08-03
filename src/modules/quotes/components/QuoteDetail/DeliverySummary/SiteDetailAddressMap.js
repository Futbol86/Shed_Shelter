import React, {PureComponent} from 'react';
import GoogleMapReact from 'google-map-react';
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {connect} from 'react-redux';

const MapMarker = ({text}) => (
    <div style={{color: 'red', position: 'absolute', transform: 'translate(-50%, -100%)'}}>
        <img src={require('../../../assets/img/logo_map.png')} style={{height: '30px', width: '30px' }} />
    </div>
);

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

    onChange = ({ center, zoom, bounds, size })=>{
        const {changeFieldValue} = this.props;
        changeFieldValue('mapZoomLevel', zoom);
    }

    mapApiIsLoaded = (map, maps) => {
        const {siteAddress, mapShedLocation, buildingLength, buildingSpan, changeFieldValue} = this.props;
        const google = window.google;
        //console.log("mapShedLocation", mapShedLocation) ;
        var circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0, 
            map,
            center: {lat: siteAddress.lat,
                    lng: siteAddress.lng},
            radius: 500,
            draggable: false,
            geodesic: false,
        });
        var shedLocation = mapShedLocation && mapShedLocation.lat && mapShedLocation.lng? mapShedLocation : siteAddress;
        var angle = shedLocation.bearing ? shedLocation.bearing : 0;
        var shed = new google.maps.Polygon({
                paths: this.shedShape(shedLocation.lat, shedLocation.lng, angle,
                        buildingSpan/1000, buildingLength/1000),
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
    };

    dragShedEnd = (evt) => {
        //console.log("Marker dropped: Current Lat: ", evt.latLng.lat() + ' Current Lng: ' + evt.latLng.lng());
        const {changeFieldValue} = this.props;
        changeFieldValue('mapShedLocation.lat', evt.latLng.lat());
        changeFieldValue('mapShedLocation.lng', evt.latLng.lng());
    }

    shedShape = (lat, lng, bearing, width, length) => {
        const google = window.google;
        var pointA = new google.maps.LatLng(lat, lng); 
        var angle = Math.atan(parseFloat(length)/width)*180/Math.PI; // in degree
        var distance = length/2/Math.sin(Math.atan(parseFloat(length)/width)); //  metres
        // console.log("shed", Math.atan(parseFloat(length)/width));
        //console.log("shed bearing", bearing) ;
        //console.log("shed angle", angle) ;
        // console.log("shed", distance) ;
        
        var point1 = google.maps.geometry.spherical.computeOffset(pointA, distance, angle + bearing);   
        var point2 = google.maps.geometry.spherical.computeOffset(pointA, distance, 180-angle + bearing);  
        var point3 = google.maps.geometry.spherical.computeOffset(pointA, distance, 180+angle + bearing);  
        var point4 = google.maps.geometry.spherical.computeOffset(pointA, distance, 360-angle + bearing); 
    
        /*console.log("shed", [{lat: point1.lat(), lng: point1.lng()}, 
            {lat: point2.lat(), lng: point2.lng()}, 
            {lat: point3.lat(), lng: point3.lng()}, 
            {lat: point4.lat(), lng: point4.lng()}]) ;*/
        return [{lat: point1.lat(), lng: point1.lng()}, 
                {lat: point2.lat(), lng: point2.lng()}, 
                {lat: point3.lat(), lng: point3.lng()}, 
                {lat: point4.lat(), lng: point4.lng()}];  
    }

    render() {
        const {siteAddress, mapZoomLevel, mapLocked, mapShedLocation} = this.props;
        if (siteAddress && (siteAddress.lat || siteAddress.lng)) {
            var keyChanged = mapShedLocation && mapShedLocation.bearing ?  mapShedLocation.bearing : 0;
            return (
                <GoogleMapReact key={mapLocked+keyChanged}
                    bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API, libraries:'geometry'}}
                    center={{
                        lat: siteAddress.lat,
                        lng: siteAddress.lng
                    }}
                    defaultZoom={15}
                    zoom={mapZoomLevel && mapZoomLevel > 0 ? mapZoomLevel : 15}
                    options={this.getMapOptions}
                    onChange={this.onChange}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.mapApiIsLoaded(map, maps)}
                >
                    <MapMarker lat={siteAddress.lat} lng={siteAddress.lng} />
                </GoogleMapReact>
            );
        }
        return null;
    }
};
const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    mapZoomLevel:        formSelector(state, "mapZoomLevel"),
    mapLocked:           formSelector(state, "mapLocked"),
    mapShedLocation:     formSelector(state, "mapShedLocation"), // lat, lng, bearing 
    buildingSpan:        formSelector(state, "buildingSpan"),
    buildingLength:      formSelector(state, "buildingLength"),
});

export default connect(mapStateToProps, {})(SiteDetailAddressMap);
