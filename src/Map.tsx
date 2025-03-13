import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "./utils/types";

import PlaceMarkers from "./PlaceMarkers";


function Map({ places, route }: { places: Place[], route: any }) {

  const DEFAULT_MAP_ZOOM = 3;
  const DEFAULT_MAP_CENTER: LatLngExpression = [37.193, -99.6226];

  // const DEFAULT_MAP_ZOOM=13
  // const DEFAULT_MAP_CENTER:LatLngExpression = [51.505, -0.09];

  console.log('route:', route)


  return (
    <>
      <MapContainer
        key={DEFAULT_MAP_CENTER.toString()}
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        id='mapContainer'
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {places.length > 0 && <PlaceMarkers places={places} />}
        {route && <Polyline pathOptions={{ color: 'blue' }} positions={route} />}
      </MapContainer>
      {/* <FormContainer key={mapCenter.toString()} mapCenter={mapCenter} updateCenter={updateCenter} /> */}
    </>
  );
}

export default Map;