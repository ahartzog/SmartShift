import mapboxgl, { Map } from 'mapbox-gl';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { Alert } from 'antd';
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapboxStyle.css';

const ACCESS_TOKEN =
  'pk.eyJ1IjoiYWhhcnR6b2ciLCJhIjoiY2t2bGE1b3k5YmZmcDJvb2ZlcWtiMzFmNCJ9.2s1FQFhj4lh359k__QOZTw';

type POI = {
  name: string;
  address: string;
  center: [number, number] | null;
  markerColor?: string;
};

const MapBox = () => {
  const mapContainer = useRef(null);
  const [mapInfo, setMapInfo] = useState<Map>();

  const [lng, setLng] = useState(-82.439427);
  const [lat, setLat] = useState(29.668267);
  const [zoom, setZoom] = useState(9);

  const [placesOfInterest, setPlacesOfInterest] = useState<POI[]>([
    {
      name: 'Our House',
      address: '9212 NW 17th place, Gainesville FL 32606',
      center: null,
      markerColor: 'green',
    },
    {
      name: 'Grandma Lisa',
      address: '3224 Pine Rd, Orange Park, FL',
      center: null,
      markerColor: '#C73737',
    },
    {
      name: 'Grandpa John',
      address: '2410 Edward Rd, West Palm Beach FL 33410',
      center: null,
    },
    {
      name: 'Cousin Ryker',
      address: '3568 XANTHIA ST DENVER CO 80238-3365',
      center: null,
      markerColor: 'blue',
    },
  ]);

  useEffect(() => {
    //Set the ref into state once so we can ensure it's usable
    if (mapInfo) {
      return;
    }
    const hi = new mapboxgl.Map({
      //@ts-ignore
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: ACCESS_TOKEN,
      center: [lng, lat],
      zoom: zoom,
    });
    console.log('hi?', hi);
    //@ts-ignore
    setMapInfo(hi);
  });

  console.log('render!');

  const round = (num: number) => {
    return Math.round(num * 1e2) / 1e2;
  };

  const getGeoDataForAddress = async (searchString: string) => {
    const homeGeo = await axios({
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=${ACCESS_TOKEN}`,
    });

    if (homeGeo.data.features.length > 0) {
      console.log('Feature?', homeGeo.data.features[0]);
      return homeGeo.data.features[0].center;
    }
    window.alert('No location found for ' + searchString);
  };

  useEffect(() => {
    console.log('Map info effect is running, this should only happen once');
    if (!mapInfo) {
      return;
    }

    //Ok, the ref is set, now we can actually do stuff

    mapInfo.addControl(new mapboxgl.NavigationControl());

    mapInfo.on('move', () => {
      setLng(round(mapInfo.getCenter().lng));
      setLat(round(mapInfo.getCenter().lat));
      setZoom(round(mapInfo.getZoom()));
    });

    const setPlacesOfInterest = async () => {
      const pois = placesOfInterest.map(async (place) => {
        //https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
        const center = await getGeoDataForAddress(place.address);
        new mapboxgl.Marker({
          color: place.markerColor ? place.markerColor : 'purple',
        })
          .setLngLat(center)
          .addTo(mapInfo);
        place.center = center;

        return place;
      });
    };

    setPlacesOfInterest();
  }, [mapInfo]);

  // useEffect(() => {
  //   console.log('running...');

  // });

  return (
    <div>
      <h1>Map, Map, Map!</h1>
      <div className='sidebar'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {/* @ts-ignore */}
      <div ref={mapContainer} className='map-container' />
      <div>
        <h3>Find Places</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {placesOfInterest.map((pl) => {
            return (
              <button
                onClick={() => {
                  if (pl.center) {
                    //setLat(pl.center[0]);
                    setLng(pl.center[1]);
                    mapInfo?.setCenter(pl.center);
                  } else {
                    window.alert('No address known for this location');
                  }
                }}
                key={pl.name}
              >
                {pl.name}
              </button>
            );
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
