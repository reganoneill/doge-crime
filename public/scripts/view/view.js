'use strict';
(function(module){
  const view = {};

    view.legend = document.getElementById('legend');
    //mission - create legend to explain current icons appearing on map
    view.icons = {
      crimes: {
        name: 'Incident',
        icon: fontawesome.markers.WARNING
      },
      parks: {
        name: 'Off-Leash Park',
        icon: './media/svg/dog-in-front-of-a-man.svg'
      }
    };
    for (var key in view.icons){
      var type = view.icons[key];
      var name = type.name;
      var icon = type.icon;
      var div = document.createElement('div');
      div.innerHTML = `<img src='${icon}'>${name}`;
      legend.appendChild(div);
    }

})(window);
