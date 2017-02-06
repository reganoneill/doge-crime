'use strict';
(function(module){

  const parksController = {};

  parksController.index = () => {
      Park.requestParkData();
  }
  module.parksController = parksController;
})(window);
