'use strict';

(function(module) {

  const googs = {};

   googs.initMap = function() {
     googs.seattle = {lat: 47.6062, lng: -122.3321};
     googs.map = new google.maps.Map(document.getElementById("google-map"), {
      zoom: 11,
      center: googs.seattle
    });
  };
  googs.initMap();
  module.googs = googs;
})(window);
