import { Marker, Tooltip, Popup, MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLng, LatLngBoundsExpression, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "./utils/types";
import { useState } from "react";


function PlaceMarkers({places}: {places: Place[]}) {
  const map = useMap();
  
  const bounds:LatLngBoundsExpression = places.map((place:Place) => [place.geometry.latitude, place.geometry.longitude])
  map.fitBounds(bounds, {padding: [50, 50]})

 return (
    <>
        {places.map((place:Place, index:any) => (
          
          <Marker key={index} position={[place.geometry.latitude, place.geometry.longitude]}>
            <Tooltip direction="top" offset={[-15, -15]} opacity={1}>
              <div className="tooltip-content">
                <h3>{place.name}</h3>
                {!!place.description && <>{place.description}</>}
              </div>
            </Tooltip>
          </Marker>
        ))}
    </>
  );
}

export default PlaceMarkers;