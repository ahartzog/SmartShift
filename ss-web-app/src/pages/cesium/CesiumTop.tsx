import * as Cesium from 'cesium';
//import 'cesium/Build/Cesium/Widgets/widgets.css';

import React from 'react';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYjYwMjJiOC05NmUwLTRmMDktYmUzNi1kYTgwZjY0YmM4YTciLCJpZCI6NzE0MjEsImlhdCI6MTYzNTIwNDc4M30.BtGjFdX29x4x2MWh77Hyd2qA6IiVpmQ8RVsMZAWkWhc';

const CesiumTop = () => {
  React.useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = viewer.scene.primitives.add(
      Cesium.createOsmBuildings()
    );
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      },
    });
  }, []);
  return (
    <div>
      <h1>Cesium</h1>
      <p>Get Cesium going here</p>
    </div>
  );
};

export { CesiumTop };
