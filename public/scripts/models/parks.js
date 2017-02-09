'use strict';

(function(module) {

  function Park(opts) {
  Object.keys(opts).forEach(e => this[e] = opts[e]);
  }

  Park.all = [];

  //new method to generate info boxes for each data marker
  Park.getInfo = function(){

    //loop through Park.all array (which has been populated by Park.requestParkData)
    //forEach object in the array, we need to create A) a string which grabs the ADDRESS, COMMON NAME, AND WEBSITE
    //then pass that string into B) a new infowindow  C) a new Marker
    // D) an event listener on the marker which shows the infowindow when clicked.

    Park.all.forEach(function(park){
      let myLatyLngy = new google.maps.LatLng(park.location.coordinates[1], park.location.coordinates[0]);
      let stringBox = `<div class="infoBox">
                        <p>${park.common_name}</p>
                        <p>${park.address}</p>
                        <p>${park.website}</p>
                      </div>`;
      let infowindow = new google.maps.InfoWindow({
        content: stringBox
      });

      let dogIcon = new google.maps.MarkerImage(
        "./media/svg/dog-in-front-of-a-man.svg",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(52, 48)
      );

      let markin = new google.maps.Marker({
        position: myLatyLngy,
        map: googs.map,
        icon: dogIcon,
        animation: google.maps.Animation.DROP,
      });

      markin.addListener('click', function() {
         infowindow.open(googs.map, markin);
       });

    })

  }//end getInfo




  Park.requestParkData = function() {
    $.get('https://data.seattle.gov/resource/3c4b-gdxv.json?city_feature=Off%20Leash%20Areas')
      .then(
        data => {
        console.log(`Retrieved ${data.length} records of off-leash areas from the dataset!`);
        data.map(function(place){
                  let dogPark = new Park(place)
                  Park.all.push(dogPark);
                });
        console.log('Park.all array:', Park.all);
        }
      )
    .then(Park.getInfo)
    // .then(callback)
  };//end requestParkData

  module.Park = Park;
})(window);
