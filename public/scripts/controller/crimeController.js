'use strict';
(function(module){


  const crimeController = {};
  crimeController.index = () => {
      Crime.requestCrimeData(Crime.plotData);
  }

  module.crimeController = crimeController;
})(window);
