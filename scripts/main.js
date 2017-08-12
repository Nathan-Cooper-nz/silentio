const BASE_REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/' +
                         'nearbysearch/json?' + 
	                 'key=***REMOVED***&';
$(document).ready(function() {


	
});

function getCafes(){
    var location = '-41.3064632,174.7749782';
	$.get(BASE_REQUEST_URL + 'location=' + location
                              + '&radius=5000&type=cafe', function (data) {
	    var totallyLegitTableTM = $('table');
        data.results.forEach(function(item) {
            //DO MAGIC
            var rightHandTable = $('table');
            var lat = item.geometry.location.lat;
            var long = item.geometry.location.lng;
            $.get(BASE_REQUEST_URL + 'location='+ lat + ',' + long + '&radius=300', function(surroundingPlaces){
                if(surroundingPlaces.results !== undefined) {
                    surroundingPlaces.results.forEach(function (i2) {
                        rightHandTable.append('<tr><td>' + i2.name + '</td></tr>');
                    });
                }
                totallyLegitTableTM.append($('tr')
                    .append($('td').append(item.name))
                    .append($('td').append(rightHandTable)
                    )
                );
                $('#results').append(totallyLegitTableTM);
                alert('look!');
            });

        });
    });
	

}

function error(msg){
    console.log(msg);
}
