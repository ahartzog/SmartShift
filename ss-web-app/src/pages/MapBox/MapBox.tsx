import mapboxgl, { Map } from 'mapbox-gl';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';

require('./mapboxStyle.css');
const MapBox = () => {
  const map = useRef<Map>(null);
  const [mapInfo, setMapInfo] = useState(null);

  const mapRef = useCallback((mapNode) => {
    // console.log(catImageNode);
    setMapInfo(mapNode);
    // setCatInfo(catImageNode?.getBoundingClientRect());
  }, []);

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

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const round = (num: number) => {
    return Math.round(num * 1e2) / 1e2;
  };

  const placesOfInterest = [
    {
      name: 'Our House',
      address: '9212 NW 17th place, Gainesville FL 32606',
    },
    {
      name: 'Grandma Lisa',
      address: '3224 Pine Rd, Orange Park, FL',
    },
    {
      name: 'Grandpa John',
      address: '2410 Edward Rd, West Palm Beach FL 33410',
    },
  ];

  const getGeoDataForAddress = async (searchString: string) => {
    const homeGeo = await axios({
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json`,
    });

    console.log('home go?', homeGeo.data);
    // new mapboxgl.Marker({
    //   color: 'red',

    // }).setLngLat
  };

  useEffect(() => {
    console.log('Map info?', mapInfo);
    //mapInfo.current!.addControl(new mapboxgl.NavigationControl());

    // props.mapBoxRef.current!.on('move', () => {
    //   setLng(round(props.mapBoxRef.current!.getCenter().lng));
    //   setLat(round(props.mapBoxRef.current!.getCenter().lat));
    //   setZoom(round(props.mapBoxRef.current!.getZoom()));
    // });
  }, [mapInfo]);

  useEffect(() => {
    console.log('running...');
    placesOfInterest.forEach((place) => {
      //https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
      getGeoDataForAddress(place.address);
    });
  });

  return (
    <div>
      <h1>Map, Map, Map!</h1>

      <div className='sidebar'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {/* @ts-ignore */}
      <div id='map' ref={mapRef} className='map-container' />
      <div>
        <h3>Find Places</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {placesOfInterest.map((pl) => {
            return <button key={pl.name}>{pl.name}</button>;
          })}
        </div>
      </div>
    </div>
  );

  // return (

  //     {/* @ts-ignore */}

  // );
};

export { MapBox };
