'use strict';
(function(module){


  const crimeController = {};

  crimeController.loadAll = (ctx, next) => {
    Crime.requestCrimeData();
  }

  page('/reports', crimeController.loadAll);


  // $(function(){
    $('.crimeButton').on('click', function(e){
      e.preventDefault();
      page(`/reports`);
    })
  // })

  module.crimeController = crimeController;
})(window);
