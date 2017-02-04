'use strict';

(function(module) {

    function Crime(opts) {
    Object.keys(opts).forEach(e => this[e] = opts[e]);
    }

    Crime.all = [];

    Crime.addMarkerToMap = function(lat, lng){
      //use either fa-exclamation-circle or fa-warning for the icon.
       Crime.myLatLng = new google.maps.LatLng(lat, lng),
       Crime.crimeMarker = new google.maps.Marker({
        map: googs.map,
        icon: {
          path: fontawesome.markers.WARNING,
          scale: 0.125,
          strokeWeight: 0.2,
          strokeColor: 'black',
          strokeOpacity: 1,
          fillColor: '#000',
          fillOpacity: 0.7
        },
        clickable: false,
        position: Crime.myLatLng,
        // animation: google.maps.Animation.DROP
      });
    };//end addMarkerToMap

    //creates an array of numbers(latitude and longitude) for every object it cycles through
    Crime.plotData = function(){
      var crimeSpots = Crime.all.map(spot => [parseFloat(spot.latitude), parseFloat(spot.longitude)]);
      console.log(crimeSpots);
      crimeSpots.forEach(function(spot){
        Crime.addMarkerToMap(spot[0], spot[1]);
        console.log('butt');
      })
    };

// https://data.seattle.gov/resource/pu5n-trf4.json?$where=at_scene_time%3E=%272016-01-12T20:00:00.000%27&event_clearance_group=ANIMAL%20COMPLAINTS
    Crime.requestCrimeData = function(callback) {
      var startYear = `${(new Date().getFullYear() - 2)}-01-01T20:00:00.000`;
      var addToQuery = `$where=at_scene_time>=%27${startYear}%27`;
      var reportedEvent = `event_clearance_group=ANIMAL%20COMPLAINTS`;
      $.get(`https://data.seattle.gov/resource/pu5n-trf4/`)
        .then(
          data => {
          console.log(`Retrieved ${data.length} records of animal complaints in the dataset`);
          data.map(function(place){
                    let petCrime = new Crime(place)
                    Crime.all.push(petCrime);
                  });
          console.log('Crime.all array:', Crime.all);
        })
      .then(callback);

  };//end requestCrimeData

  Crime.requestCrimeData(Crime.plotData);

  module.Crime = Crime;
})(window);
