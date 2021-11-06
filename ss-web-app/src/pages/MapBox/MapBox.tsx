import React, { useState, useRef, useEffect } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
require('./mapboxStyle.css');
const MapBox = () => {
  //Let's make an app that just moves around to our key spots
  //Our house
  //Eric's house
  //Grandma Lisa's House
  //Grandpa John's house

  const [pointsOfInterest, setPointsOfInterest] = React.useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  // React.useEffect(() => {
  //   //Used to ensure the DOM has rendered our map element

  //   mapboxgl.accessToken =
  //     'pk.eyJ1IjoiYWhhcnR6b2ciLCJhIjoiY2t2bGE1b3k5YmZmcDJvb2ZlcWtiMzFmNCJ9.2s1FQFhj4lh359k__QOZTw';
  //   new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [lng, lat],
  //     attributionControl: true,
  //   });
  // }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    //@ts-ignore
    map.current = new mapboxgl.Map({
      //@ts-ignore
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      accessToken:
        'pk.eyJ1IjoiYWhhcnR6b2ciLCJhIjoiY2t2bGE1b3k5YmZmcDJvb2ZlcWtiMzFmNCJ9.2s1FQFhj4lh359k__QOZTw',
      zoom: zoom,
    });
  });

  // useEffect(() => {
  //   if (!map.current) {
  //     return; // wait for map to initialize
  //   }

  //   map.current.on('move', () => {
  //     setLng(map.current!.getCenter().lng.toFixed(4));
  //     setLat(map.current!.getCenter().lat.toFixed(4));
  //     setZoom(map.current!.getZoom().toFixed(2));
  //   });
  // });

  console.log('map?', map);

  return (
    <div>
      <h1>Map, Map, Map!</h1>

      <div className='sidebar'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {/* @ts-ignore */}
      <div ref={mapContainer} className='map-container' />
    </div>
  );
};

export { MapBox };
