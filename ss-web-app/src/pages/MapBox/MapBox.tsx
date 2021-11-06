import mapboxgl, { Map } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import { MapBoxControls } from './MapBoxControls';

require('./mapboxStyle.css');
const MapBox = () => {
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<Map>(null);

  useEffect(() => {
    console.log('Effect!');
    if (map.current) {
      return;
    }
    const hi = new mapboxgl.Map({
      //@ts-ignore
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken:
        'pk.eyJ1IjoiYWhhcnR6b2ciLCJhIjoiY2t2bGE1b3k5YmZmcDJvb2ZlcWtiMzFmNCJ9.2s1FQFhj4lh359k__QOZTw',
    });

    //@ts-ignore
    map.current = hi;
  });

  console.log('render!');

  return (
    <MapBoxControls mapBoxRef={map}>
      {/* @ts-ignore */}
      <div id='map' className='map-container' />
    </MapBoxControls>
  );
};

export { MapBox };
