const BASE_REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/' +
                         'nearbysearch/json?' +
	                 'key=***REMOVED***&';
$(document).ready(function() {
  getCafes();


});

function getCafes(){
    var location = '-41.3064632,174.7749782';
	$.get(BASE_REQUEST_URL + 'location=' + location
                              + '&radius=5000&type=cafe', function (data) {
        data.results.forEach(function(item) {
            var name = item.name;
            var lat = item.geometry.location.lat;
            var long = item.geometry.location.lng;

            var locationsNearBy = new Set();
            locationsNearBy.add(name);
            $.get(BASE_REQUEST_URL + 'locatio='+ lat + ',' + long + '&radius=100', function(surroundingPlaces){
			  var innerDiv = document.createElement('div');
			  innerDiv.className = 'innerDiv';
			  innerDiv.innerHTML = name;
			  
			  var resultDiv = document.createElement('div');
			  resultDiv.className = 'resultDiv';
              var listNearby = document.createElement('ul');
			  
			  resultDiv.append(listNearby);
			  
              surroundingPlaces.results.forEach(function (it){
                if(!locationsNearBy.has(it.name)){
                  var point = document.createElement('li');
                  point.innerHTML=it.name;
                  listNearby.appendChild(point);
                  locationsNearBy.add(it.name);
                }
              })
			  innerDiv.append(resultDiv);
              $('#results').append(innerDiv);
                // if(surroundingPlaces.results !== undefined) {
                //     surroundingPlaces.results.forEach(function (i2) {
                //         rightHandTable.append('<tr><td>' + i2.name + '</td></tr>');
                //     });
                // }
                // totallyLegitTableTM.append($('tr')
                //     .append($('td').append(item.name))
                //     .append($('td').append(rightHandTable)
                //     )
                // );
                // $('#results').append(totallyLegitTableTM);
                // alert('look!');
            });

        });
    });


}

function error(msg){
    console.log(msg);
}
