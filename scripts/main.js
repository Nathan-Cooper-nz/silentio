const BASE_REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/' +
                         'nearbysearch/json?' +
                     'key=***REMOVED***&';
var map;

var iconBase = 'http://localhost:8000/icons/';
var iconCoffee = iconBase + 'coffee.png';
var iconMarker = iconBase + 'marker.png';

$(document).ready(function() {
  // getCafes();

});

function getCafes(){
    var location = '-41.3064632,174.7749782';
    console.log(map);
    $.get(BASE_REQUEST_URL + 'location=' + location
                              + '&rankby=distance&type=cafe', function (data) {
        //array of the ajax requests to later use with a .when statement
        var ajaxRequests = new Array();
        //items to be added after the ajax requests are all done
        var itemsToAdd = new Map();

        data.results.forEach(function(item) {
            var name = item.name;
            var lat = item.geometry.location.lat;
            var long = item.geometry.location.lng;

            //a set of unique things around the location
            var locationsNearBy = new Set();
            locationsNearBy.add(name);
            locationsNearBy.add("Wellington");  //Ssshh #HackFest
            $.get(BASE_REQUEST_URL + 'location='+ lat + ',' + long + '&radius=100', function(surroundingPlaces){
              var innerDiv = document.createElement('div');
              innerDiv.className = 'card';

              var newDiv = document.createElement('div');
              var resultDiv = document.createElement('div');
              resultDiv.className = 'resultDiv blu';

              surroundingPlaces.results.forEach(function (it){
                //if we havent seen a similar name before
                if(!locationsNearBy.has(it.name)){
                  var singleResultDiv = document.createElement('div');
                  singleResultDiv.className = 'singleResultDiv';
                  var listNearby = document.createElement('ul');
                  var point = document.createElement('li');
                  point.innerHTML=it.name;
                  listNearby.appendChild(point);
                  singleResultDiv.appendChild(listNearby);
                  resultDiv.appendChild(singleResultDiv);
                  locationsNearBy.add(it.name);
                }
              })
              newDiv.className = 'card-content';
              newDiv.innerHTML =  `<span class="card-title">${name} (${locationsNearBy.size - 2})</span>`;

              innerDiv.appendChild(newDiv);
                newDiv.appendChild(resultDiv);
                new google.maps.Marker({
                  position: {lat: lat, lng: long},
                  map: map,
                  icon: iconCoffee

                });
              $('#results').append(innerDiv);
            });
        });
    });


}

function initMap() {
  // console.log("working")

  var styledMapType = new google.maps.StyledMapType(
    [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]);
  const flux = {lat:-41.3064632, lng:174.7749782};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: flux
  });
  map.mapTypes.set('silver',styledMapType);
  map.setMapTypeId('silver');
  var marker = new google.maps.Marker({
    position: flux,
    map: map,
    icon: iconMarker
  });


  getCafes()
}

function error(msg){
    console.log(msg);
}
