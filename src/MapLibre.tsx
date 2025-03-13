import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl'
import { Map, MapRef, NavigationControl, Source, Layer } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './index.css'
import { Protocol } from 'pmtiles'
import { Place } from "./utils/types";
import { layers, namedFlavor } from '@protomaps/basemaps';
import PlaceMarkers from "./PlaceMarkersMapLibre";
import { routeStyle } from './mapstyle';

function MapLibre({ places, route }: { places: Place[], route: any }) {

  const DEFAULT_MAP_ZOOM = 3;
  const DEFAULT_LONGITUDE = -99.6226;
  const DEFAULT_LATITUDE = 37.193;
  const PMTILES_URL = import.meta.env.VITE_PMTILES_URL
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  places.forEach((place) => {
    console.log('place:', place)
  })

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
          glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
          sources: {
            protomaps: {
              type: 'vector',
              tiles: [PMTILES_URL]
            }
          },
          layers: layers("protomaps", namedFlavor("light"), { lang: "en" })
        }}
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