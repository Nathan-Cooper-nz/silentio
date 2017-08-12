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
	    var totallyLegitTableTM = $('table');
        data.results.forEach(function(item) {
            var name = item.name;
            var lat = item.geometry.location.lat;
            var long = item.geometry.location.lng;

            var locationsNearBy = new Set();
            locationsNearBy.add(name);
            $.get(BASE_REQUEST_URL + 'location='+ lat + ',' + long + '&radius=100', function(surroundingPlaces){
              var tableRow = document.createElement('tr');
              // $(tableRow).append($('td').text(name));
              tableRow.insertCell(-1).appendChild(document.createTextNode(name));
              var listNearby = document.createElement('ul');
              var right = tableRow.insertCell(-1).appendChild(listNearby);
              surroundingPlaces.results.forEach(function (it){
                if(!locationsNearBy.has(it.name)){
                  var point = document.createElement('li');
                  point.innerHTML=it.name;
                  listNearby.appendChild(point);
                  locationsNearBy.add(it.name);
                }
                // listNearby.appendChild(document.createElement('li').appendChild(document.createTextNode(it.name)))
              })
              $('#table').append(tableRow);
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
