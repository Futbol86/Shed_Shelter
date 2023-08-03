
let CoordinateUtils = {
    shedShape(lat, lng, bearing, width, length) {
        const google = window.google;
        //var pointA = new google.maps.LatLng(lat, lng); 
        var angle = Math.atan(parseFloat(length)/width)*180/Math.PI; // in degree
        var distance = length/2/Math.sin(Math.atan(parseFloat(length)/width)); //  metres
        // console.log("shed", Math.atan(parseFloat(length)/width));
        //console.log("shed bearing", bearing) ;
        //console.log("shed angle", angle) ;
        // console.log("shed", distance) ;
        
        /*var point1 = google.maps.geometry.spherical.computeOffset(pointA, distance, angle + bearing);   
        var point2 = google.maps.geometry.spherical.computeOffset(pointA, distance, 180-angle + bearing);  
        var point3 = google.maps.geometry.spherical.computeOffset(pointA, distance, 180+angle + bearing);  
        var point4 = google.maps.geometry.spherical.computeOffset(pointA, distance, 360-angle + bearing);*/
        
        var point1 = this.moveCoordinate(lat, lng, distance, angle + bearing);   
        var point2 = this.moveCoordinate(lat, lng, distance, 180-angle + bearing);  
        var point3 = this.moveCoordinate(lat, lng, distance, 180+angle + bearing);  
        var point4 = this.moveCoordinate(lat, lng, distance, 360-angle + bearing);
    
        /*console.log("shed", [{lat: point1.lat, lng: point1.lng}, 
            {lat: point2.lat, lng: point2.lng}, 
            {lat: point3.lat, lng: point3.lng}, 
            {lat: point4.lat, lng: point4.lng}]) ;
        return [{lat: point1.lat(), lng: point1.lng()}, 
                  {lat: point2.lat(), lng: point2.lng()}, 
                  {lat: point3.lat(), lng: point3.lng()}, 
                  {lat: point4.lat(), lng: point4.lng()}]; */
        return [point1, point2, point3, point4]; 
    },

    moveCoordinate(lat1, long1, distance, angle)
    {
        //Earth Radious in KM
        const R = 6378.14;
        const d = distance / 1000;

        //Degree to Radian
        var latitude1 = lat1 * (Math.PI/180);
        var longitude1 = long1 * (Math.PI/180);
        var brng = angle * (Math.PI/180);

        var latitude2 = Math.asin(Math.sin(latitude1)*Math.cos(d/R) + Math.cos(latitude1)*Math.sin(d/R)*Math.cos(brng));
        var longitude2 = longitude1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(latitude1),Math.cos(d/R)-Math.sin(latitude1)*Math.sin(latitude2));

        //Back to degrees
        latitude2 = latitude2 * (180/Math.PI);
        longitude2 = longitude2 * (180/Math.PI);

        return {
            lng: longitude2,
            lat: latitude2
        }
    }
}
export default CoordinateUtils;