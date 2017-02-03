'use strict';

(function(module) {

  function Park(opts) {
  Object.keys(opts).forEach(e => this[e] = opts[e]);
  }

  Park.all = [];
  //grabbed this from a tutorial - trying it out
  Park.addMarkerToMap = function(lat, lng){

    var dogIcon = new google.maps.MarkerImage(
      "./media/svg/dog-in-front-of-a-man.svg",
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(52, 48)
  );
    var myLatLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: googs.map,
      icon: dogIcon,
      animation: google.maps.Animation.DROP,
    });
    // marker.setMap(map);
  };//end addMarkerToMap

  Park.getCoords = function(){
      var parkLocation = Park.all.map(loc => loc.location.coordinates);
      parkLocation.forEach(function(marker){
        console.log('lat:', marker[1], 'lng:', marker[0]);
        // let markerDrop = {lat: marker[1], lng: marker[0]};
        // let newPoint = new google.maps.Marker({
        //    position: markerDrop,
        //    map: map
        // })
        // [ [3,55],[4,133],[6,92],[4,329],... ]
        Park.addMarkerToMap(marker[1], marker[0]);
      })
  }//end getCoords


  Park.requestParkData = function(callback) {
    $.ajax({
      url: "https://data.seattle.gov/resource/3c4b-gdxv.json?city_feature=Off%20Leash%20Areas",
      type: 'GET',
      data: {
        "$limit" : 25000,
        "$$app_token" : ""
      },
      success: (function(data){
        console.log(`Retrieved ${data.length} records of off-leash areas from the dataset!`);
        data.map(function(place){
                  let dogPark = new Park(place)
                  Park.all.push(dogPark);
                });
        console.log('Park.all array:', Park.all);
      })
    })
    .then(callback);
  };//end requestParkData

  Park.requestParkData(Park.getCoords);
  module.Park = Park;
})(window);
