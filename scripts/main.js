const BASE_REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/' +
                         'nearbysearch/json?' +
	                 'key=***REMOVED***&';
$(document).ready(function() {
  getCafes();


});

function getCafes(){
    var location = '-41.3064632,174.7749782';
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
            $.get(BASE_REQUEST_URL + 'location='+ lat + ',' + long + '&radius=100', function(surroundingPlaces){
			  var innerDiv = document.createElement('div');
			  innerDiv.className = 'innerDiv';
			  innerDiv.innerHTML = name;

			  var resultDiv = document.createElement('div');
			  resultDiv.className = 'resultDiv';

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

			  innerDiv.appendChild(resultDiv);
              $('#results').append(innerDiv);
            });
        });
        //
        // $.when.apply($, ajaxRequests).then(function(){
        //
        // })
    });


}

function error(msg){
    console.log(msg);
}
