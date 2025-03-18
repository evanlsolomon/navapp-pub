import { useEffect, useRef } from 'react';

// this is now done in the parent component
// import maplibregl from 'maplibre-gl'
// import { Protocol } from 'pmtiles'

import { Map, MapRef, NavigationControl, Source, Layer } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './index.css'


import { Place } from "./utils/types";
import { layers, namedFlavor } from '@protomaps/basemaps';
import PlaceMarkers from "./PlaceMarkersMapLibre";
import { routeStyle } from './mapstyle';

function MapLibre({
  places,
  route,
  maplibregl
}: {
  places: Place[],
  route: any,
  maplibregl: any
}) {

  const DEFAULT_MAP_ZOOM = 3;
  const DEFAULT_LONGITUDE = -99.6226;
  const DEFAULT_LATITUDE = 37.193;

  const PMTILES_REMOTE_URL_US: string = import.meta.env.VITE_PMTILES_REMOTE_URL_US
  const PMTILES_REMOTE_ZXY_URL_US: string = import.meta.env.VITE_PMTILES_REMOTE_ZXY_URL_US

  const PMTILES_LOCALHOST_URL_US: string = import.meta.env.VITE_PMTILES_LOCALHOST_URL_US
  const PMTILES_LOCALHOST_ZXY_URL_US: string = import.meta.env.VITE_PMTILES_LOCALHOST_ZXY_URL_US
  const mapRef = useRef<MapRef>(null);

  // if there are places, fit the map to the bounds of the places
  if (places.length > 0) {

    const bounds = new maplibregl.LngLatBounds();

    places.forEach((place) => {
      bounds.extend([place.geometry.longitude, place.geometry.latitude]);
    });
    if (places.length === 1) {
      // zoom to the single place
      mapRef.current?.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    } else {
      mapRef.current?.fitBounds(bounds, { padding: 100 });
    }
  }

  return (
    <div id="map">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: DEFAULT_MAP_ZOOM

        }}
        mapStyle={{
          version: 8,
          sources: {
            protomaps: {
              type: 'vector',
              // only one of the below url/tiles properties:
              // remote:
              url: PMTILES_REMOTE_URL_US,
              // tiles: [PMTILES_REMOTE_ZXY_URL_US], 

              // local:
              // url: PMTILES_LOCALHOST_URL_US, // this works
              // tiles: [PMTILES_LOCALHOST_ZXY_URL_US], // this works
              maxzoom: 15 // overzooming
            }
          },
          glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
          layers: layers("protomaps", namedFlavor("light"), { lang: "en" }),
          sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light"
        }}
        mapLib={maplibregl}
      >
        <NavigationControl position="top-right" />
        {places.length > 0 && <PlaceMarkers places={places} />}
        {route &&
          <Source
            id="route"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }} >
            <Layer {...routeStyle} />
          </Source>
        }
      </Map>
    </div >
  );
}




export default MapLibre;