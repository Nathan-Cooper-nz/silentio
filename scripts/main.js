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

            //create an ajax request and add it to the array
            $.get(BASE_REQUEST_URL + 'location='+ lat + ','
                + long + '&radius=100', function(surroundingPlaces){
                    var tableRow = document.createElement('tr');
                    tableRow.insertCell(-1).appendChild(document.createTextNode(name));

                    //creates an unorded list of surrounding things
                    var listNearby = document.createElement('ul');

                    var right = tableRow.insertCell(-1).appendChild(listNearby);

                    //Add surroundingPlaces
                    surroundingPlaces.results.forEach(function (it){
                        //if we havent seen a similar name before
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
            //
            // $.when.apply($, ajaxRequests).then(function(){
            //
            // })
        });


}

function error(msg){
    console.log(msg);
}
