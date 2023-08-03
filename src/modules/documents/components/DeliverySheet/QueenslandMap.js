import React, {Component} from 'react';
import {formValueSelector} from "redux-form";
//import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {connect} from 'react-redux';
import { loadModules } from 'esri-loader';
import CoordinateUtils from '../../../quotes/components/QuoteDetail/DeliverySummary/CoordinateUtils';

class QueenslandMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = { mapHeight: 300};
  }

  componentDidUpdate(prevProps){
    //console.log("prevProps", prevProps);
    if (this.view) {
      const {key} = this.props;
      if(prevProps.key !== key){
        this.refreshMap();
      }
    }
  }

  componentDidMount() {
      this.refreshMap();
  }

  refreshMap = () => {
    const {centerCoordinate, zoomLevel, updateZoom, mapLocked, buildingSpan, buildingLength, mapShedLocation, updateShedPosition} = this.props;

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 
                  'esri/views/MapView', 
                  "esri/layers/GraphicsLayer", 
                  "esri/Graphic",
                  "esri/geometry/Circle", 
                  "esri/geometry/geometryEngine",
                  "esri/layers/MapImageLayer",
                  "esri/Basemap",
                  "esri/layers/ImageryLayer",
                  "esri/widgets/Fullscreen","esri/core/watchUtils"
                ], { css: true })
    .then(([ArcGISMap, MapView, GraphicsLayer, Graphic, Circle, geometryEngine, MapImageLayer,
       Basemap, ImageryLayer, Fullscreen, watchUtils]) => {
      const graphicsLayer = new GraphicsLayer({id: "shedGraphics"});
      const graphicsLayerBg = new GraphicsLayer({id: "circleGraphics"});
      var propertyRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          style: "none",
          outline: {
            width: 0.7,
            color: [255, 0, 0, 0.7],
          }
        },
        label: "Property boundaries"
      };

      var lotPlanlayer = new MapImageLayer({
        url: "https://gisservices.information.qld.gov.au/arcgis/rest/services/Basemaps/FoundationData/MapServer",
        sublayers: [
          {
            id: 2,
            renderer: propertyRenderer,
            opacity: 1,
            //minScale: 9250000,
            // labelingInfo autocasts to an array of LabelClass objects
            labelingInfo: [
              {
                labelExpression: "[PLAN]",
                labelPlacement: "always-horizontal",
                symbol: {
                  type: "text", // autocasts as new TextSymbol()
                  color: [255, 255, 255, 1.0],
                  haloColor: [0, 0, 0, 0.7],
                  haloSize: 0.5,
                  font: {
                    size: 8
                  }
                }
              },
              {
                labelExpression: "[LOT]",
                labelPlacement: "always-horizontal",
                symbol: {
                  type: "text", // autocasts as new TextSymbol()
                  color: [255, 255, 255, 1.0],
                  haloColor: [0, 0, 0, 0.7],
                  haloSize: 0.5,
                  font: {
                    size: 8
                  }
                }
              }
            ]
          },
          {
            id: 23,
            opacity: 1,
          }
        ]
      });

      var imageryLayer = new ImageryLayer({
        url:
          "https://spatial-img.information.qld.gov.au/arcgis/rest/services/Basemaps/LatestStateProgram_AllUsers/ImageServer",
        format: "jpg", // server exports in either jpg or png format
        opacity: 1
      });

      const map = new ArcGISMap({
        basemap: 'satellite',
        autoResize: true,
        layers: [imageryLayer, lotPlanlayer, graphicsLayerBg, graphicsLayer]
        
      });

     
      let mapView = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [centerCoordinate.lng, centerCoordinate.lat],
        zoom: zoomLevel
      });
      this.view = mapView;

      var handle = this.view.watch('zoom', function(newValue, oldValue, property, object) {
        if(newValue > 0){
          updateZoom(newValue);
        }
      });

      if(mapLocked){
        this.lockMap(this.view);
      }

      // draw circle
      var circle = new Circle({
        center: [centerCoordinate.lng, centerCoordinate.lat],
        radius: 500
      });
      var circleSymbol = {
        type: "simple-fill",
        outline: {
          color: [255, 0, 0], 
          width: 1
        }
      };
      var pointGraphic = new Graphic({
        geometry: circle,
        symbol: circleSymbol
      });
      graphicsLayerBg.add(pointGraphic);

      const arcShape = generateShapeFromCoordinate(centerCoordinate.lat, centerCoordinate.lng);
      let shedSymbol = {
        type: "simple-fill",
        color: [255, 0, 0, 0.7], 
        outline: {
          color: [255, 0, 0], 
          width: 1
        }
      };

      let centerOfShed = centerCoordinate;
      let editGraphic = new Graphic({    
          geometry: {
            type: "polygon",
            rings: arcShape
          },    
          symbol: shedSymbol
      });  
      graphicsLayer.add(editGraphic);
      
      var applicationDiv = document.getElementById("applicationDiv");
      var fullscreen = new Fullscreen({
        view: this.view,
        element: applicationDiv
      });
      this.view.ui.add(fullscreen, "top-right");  

      watchUtils.watch(fullscreen.viewModel, "state", (value)=>{
        if(value === "active"){
          this.setState({
            mapHeight: '100%'
          });
        } else if(value === "ready"){
          this.setState({
            mapHeight: 300
          });
         }
      });
      
      this.view.on("drag", function(evt) {       
        switch(evt.action) {      
          case "update":  //DRAGGING    
              //console.log("update");
              var screenPoint = { x: evt.x, y: evt.y };  
              var mapPoint = mapView.toMap(screenPoint);
              // new center circle
              var circle = new Circle({
                center: [mapPoint.longitude, mapPoint.latitude],
                radius: 0.5
              });
              if(editGraphic && editGraphic.geometry && geometryEngine.contains(editGraphic.geometry, circle)){
                evt.stopPropagation();
              }    
              mapView.hitTest(screenPoint).then(function(response) {      
                  if(response.results){
                    for (var i = 0; i < response.results.length; i++) {
                      if(response.results[i].graphic && response.results[i].graphic.layer.id === "shedGraphics"){
                        evt.stopPropagation();
                        var graphic = response.results[i].graphic;
                        if (graphic) {
                          updateSelectedFeatureGraphic(mapView.toMap(screenPoint));      
                        }
                      }
                    }
                  }
              });      
            break;  
          case "end":  //DROP 
            if(editGraphic && (centerCoordinate.lat !== centerOfShed.lat 
                          || centerCoordinate.lng !== centerOfShed.lng)){
                updateShedPosition(centerOfShed.lat , centerOfShed.lng);
            }
            break;  
        }  ;
    });

    function updateSelectedFeatureGraphic(geometry) {  
        if (editGraphic)      
          removeSelectedFeatureGraphic();  
        
        centerOfShed = {lat: geometry.latitude, lng:geometry.longitude};
        editGraphic = new Graphic({    
          geometry: {
            type: "polygon",
            rings: generateShapeFromCoordinate(geometry.latitude, geometry.longitude)
          },    
          symbol: shedSymbol
        });  
        graphicsLayer.add(editGraphic);
    }
    
    function removeSelectedFeatureGraphic() {  
        graphicsLayer.remove(editGraphic);  
        editGraphic = null;
    }

    function generateShapeFromCoordinate(lat, lng){
      const angle = mapShedLocation && mapShedLocation.bearing ? parseInt(mapShedLocation.bearing) : 0;
      const shape = CoordinateUtils.shedShape(lat, lng, angle,
                      buildingSpan/1000, buildingLength/1000);
      return convertShapeToPolyLine(shape);
    }

    function convertShapeToPolyLine(shape){
        var result = [];
        var firstElement;
        for (let index = 0; index < shape.length; index++) {
          const element = shape[index];
          if(index === 0){
            firstElement = shape[index];
          }
          result.push([element.lng, element.lat]);
        }
        result.push([firstElement.lng, firstElement.lat]);
        return result;
    }
    });
  }
  
  lockMap = (view) => {
    view.ui.components = ["attribution"];
    view.on("double-click", ["Control"], function(event) {
      event.stopPropagation();
    });
    view.on("double-click", function(event) {
      event.stopPropagation();
    });
    view.on("drag", function(event) {
      event.stopPropagation();
    });
    view.on("drag", ["Shift"], function(event) {
      event.stopPropagation();
    });
    
    view.on("drag", ["Shift", "Control"], function(event) {
      event.stopPropagation();
    });
    view.on("mouse-wheel", function(event) {
      event.stopPropagation();
    });
    view.on("key-down", function(event) {
      var prohibitedKeys = ["+", "-", "Shift", "_", "="];
      var keyPressed = event.key;
      if (prohibitedKeys.indexOf(keyPressed) !== -1) {
        event.stopPropagation();
      }
    });
  } 

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div id="applicationDiv" style={{position: 'absolute', width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'}}>
        <div className="webmap" ref={this.mapRef} style={{  width: '100%',
        height: this.state.mapHeight,
        flex: '1 1 auto',
        order: 1}}/>
      </div>
      
    );
  }
};
// const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
// const mapStateToProps = (state) => ({
//     mapLocked:           formSelector(state, "mapLocked"),
//     mapShedLocation:     formSelector(state, "mapShedLocation"), // lat, lng, bearing 
//     buildingSpan:        formSelector(state, "buildingSpan"),
//     buildingLength:      formSelector(state, "buildingLength"),
// });

export default QueenslandMap;