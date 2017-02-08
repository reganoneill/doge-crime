'use strict';

page('/', parksController.index);
//commenting the /reports listener out for now to try and incorporate it into crimeController.js
page('/reports', crimeController.loadAll);
// add this later
// page('/about', aboutController.index);
page();
