import React from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const MapBox = () => {
  //Let's make an app that just moves around to our key spots
  //Our house
  //Eric's house
  //Grandma Lisa's House
  //Grandpa John's house

  React.useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWhhcnR6b2ciLCJhIjoiY2t2bGE1b3k5YmZmcDJvb2ZlcWtiMzFmNCJ9.2s1FQFhj4lh359k__QOZTw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }, []);

  return (
    <div>
      <h1>Map, Map, Map!</h1>
      <div id='map'></div>
    </div>
  );
};

export { MapBox };
