'use strict';

const express = require('express');
const requestProxy = require('express-request-proxy');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

// NOTE: Routes for requesting HTML resources
app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));


app.get('/resource/3c4b-gdxv/*', proxySeattleParks);
app.get('/resource/pu5n-trf4/*', proxySeattleCrime);

function proxySeattleParks(request, response) {
  console.log('Routing Seattle Socrata Data request for', request.params[0]);
  (requestProxy({
    url: `https://data.seattle.gov/resource/3c4b-gdxv.json?city_feature=Off%20Leash%20Areas$$app_token=${process.env.SEATTLE_DATA_TOKEN}`,
    // headers : {
    //   Host: data.seattle.gov;
    //   Accept: application/json;
    //   // url: `https://data.seattle.gov/resource/3c4b-gdxv.json?city_feature=Off%20Leash%20Areas`,
    //   X-App-Token : `${process.env.SEATTLE_DATA_TOKEN}`
    // }
    // data: {
    //   "$limit" : 25000,
    //   `$$app_token : ${process.env.SEATTLE_DATA_TOKEN}`
    // }
  }))(request, response);
}

function proxySeattleCrime(request, response) {
  console.log('Routing Seattle Socrata Data request for', request.params[0]);
  var startYear = `${(new Date().getFullYear() - 2)}-01-01T20:00:00.000`;
  var addToQuery = `$where=at_scene_time>=%27${startYear}%27`;
  var reportedEvent = `event_clearance_group=ANIMAL%20COMPLAINTS`;
  (requestProxy({
    url: `https://data.seattle.gov/resource/pu5n-trf4.json?${addToQuery}&${reportedEvent}$$app_token=${process.env.SEATTLE_DATA_TOKEN}`,
    // X-App-Token : `${process.env.SEATTLE_DATA_TOKEN}`

    // data: {
    //   "$limit" : 25000,
    //   `$$app_token : ${process.env.SEATTLE_DATA_TOKEN}`
    // }
  }))(request, response);
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
