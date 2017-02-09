'use strict';
(function(module){


  const crimeController = {};

  crimeController.loadAll = () => {
    Crime.requestCrimeData();
  }

  // // $(function(){
  //   $('.crimeButton').on('click', function(e){
  //     e.preventDefault();
  //     page(`/reports`);
  //   })
  // // })

  module.crimeController = crimeController;
})(window);
