// Map via Mapbox GL



function CurrentYear() {
  var thisYear = new Date().getFullYear()
  $("#currentYear").text(thisYear);
}

var mapCoordinates = [149.124779,-35.308586,];
var mapZoom = 12;

// the key from the Mapbox examples (not mine)
var mapAccessToken = "pk.eyJ1IjoibWV0cmljb24iLCJhIjoiY2l3eTQxMWl3MDBmYTJ6cWg3YmZtdjdsMSJ9.2vDbTw3ysscpy3YWkHo6aA";

var map = null;
var geocoder = null;
var draw = null;

function initMap() {
  map = MapGL();
}

function MapGL() {
  mapboxgl.accessToken = mapAccessToken;

  // initialize map
  var newMap = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/light-v9", //stylesheet location
      center: mapCoordinates, // starting position
      zoom: mapZoom // starting zoom
  });

  var drawOptions = 
    {
      controls: 
      { 
        combine_features: false, 
        polygon: true, 
        line: true, 
        point: true, 
        line_string: true, 
        trash:true 
      },
      displayControlsDefault: false
    };

  draw = new MapboxDraw(drawOptions);

  newMap.addControl(draw);
  
  // event handlers
  newMap.on("load", mapLoaded);
  
  return newMap;
}

function mapLoaded() {
  // do stuff here

  map.on("draw.create", drawCreate);
  
}

function drawCreate(e)
{
  // close the alert about using not having drawn on map yet

  $('#noDrawingsAlert').hide();
}