import { Marker } from '@vis.gl/react-maplibre';
import { Place } from "./utils/types";
import 'maplibre-gl/dist/maplibre-gl.css';
function PlaceMarkers({ places }: { places: Place[] }) {


  return (
    <>
      {places.map((place: Place, index: any) => (

        <Marker key={index}
          latitude={place.geometry.latitude}
          longitude={place.geometry.longitude}
          color="red">
        </Marker>
      ))}
    </>
  );
}

export default PlaceMarkers;