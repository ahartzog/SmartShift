import React, { useState, useRef, useEffect } from 'react';
import mapboxgl, { Map, GeoJSONSource } from 'mapbox-gl';
import axios from 'axios';

type Props = {
  mapBoxRef: React.RefObject<Map>;
  children: React.ReactChild;
};

const MapBoxControls = (props: Props) => {
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
    props.mapBoxRef.current!.addControl(new mapboxgl.NavigationControl());

    props.mapBoxRef.current!.on('move', () => {
      setLng(round(props.mapBoxRef.current!.getCenter().lng));
      setLat(round(props.mapBoxRef.current!.getCenter().lat));
      setZoom(round(props.mapBoxRef.current!.getZoom()));
    });
  }, []);

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
      {props.children}
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
};

export { MapBoxControls };
