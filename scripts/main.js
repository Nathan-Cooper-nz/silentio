const BASE_REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/' +
                         'nearbysearch/json?' + 
	                 'key=***REMOVED***&';
$(document).ready(function() {


	
});

function getCafes(){
    var location = '-41.3064632,174.7749782';
	$.ajax({
        url: BASE_REQUEST_URL + 'location=' + location 
                              + '&radius=5000&type=cafe',
        error: error('ajax fucked up'),
        data: 'json',
        success: function(data){
            //do the things
            console.log(data);
        },
        type: 'GET'

	});
}

function error(msg){
    console.log(msg);
}
