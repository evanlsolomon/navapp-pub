import { LatLngExpression } from "leaflet";


type Place = {
  id: string; // a combination of the latitude and longitude
  name: string;
  description?: string;
  address: string;
  geometry: {
    latitude: number;
    longitude: number
  }
}

export type { Place }